import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "../auth/user.entity";
import { Logger } from "@nestjs/common";


@Injectable()
export class TasksRepository extends Repository<Task> {
    private logger = new Logger('TasksRepository', { timestamp: true });
    constructor(datasource: DataSource) {
        super(Task, datasource.createEntityManager());
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where( { user } );

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }

        try {
            const tasks = await query.getMany();
            return tasks; 
        } catch (error) {
            this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
            
        }

    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto; // destructuring

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });
        await this.save(task);
        return task;
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const result = await this.delete({ id, user });
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }
}

