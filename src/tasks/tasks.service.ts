import { Injectable, NotFoundException } from '@nestjs/common';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
// import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    constructor(private tasksRepository: TasksRepository) { }

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    async getTasksById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOneBy({ id });
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    deleteTask(id: string): Promise<void> {
        return this.tasksRepository.deleteTask(id);
    }


    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTasksById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }
}
