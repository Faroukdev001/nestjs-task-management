import { Injectable, NotFoundException } from '@nestjs/common';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
// import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(private tasksRepository: TasksRepository) { }

    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user);
    }

    async getTasksById(id: string, user: User): Promise<Task> {
        const found = await this.tasksRepository.findOneBy({ id, user });
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    deleteTask(id: string, user: User): Promise<void> {
        return this.tasksRepository.deleteTask(id, user);
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTasksById(id, user);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }
}
