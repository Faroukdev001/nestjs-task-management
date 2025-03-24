// import { Test, TestingModule } from '@nestjs/testing';
// import { TasksService } from './tasks.service';
// import { TasksRepository } from './tasks.repository';

// // const mockTasksRepository = () => ({
// //     getTasks: jest.fn(),
// // });

// describe('TasksService', () => {
//     let tasksService: TasksService;
//     let tasksRepository: TasksRepository;

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 TasksService,
//                 {
//                     provide: TasksRepository,
//                     useFactory: () => ({
//                         getTasks: jest.fn(),
//                     }),
//                 },
//             ],
//         }).compile();

//         tasksService = module.get<TasksService>(TasksService);
//         tasksRepository = module.get<TasksRepository>(TasksRepository);
//     });

//     describe('getTasks', () => {
//         it('get all tasks from the repository', async () => {
//             tasksRepository.getTasks.mockResolvedValue('someValue');
//             expect(tasksRepository.getTasks).not.toHaveBeenCalled();
//             const filters = { status: 'OPEN', search: 'Some search query' };
//             const result = await tasksService.getTasks(filters, null);
//             expect(tasksRepository.getTasks).toHaveBeenCalled();
//             expect(result).toEqual('someValue');
//         });
//     });

    
// });