// import { Repository } from 'typeorm';
// import { Counters } from "@db_tbl/Counters";
// import dataSource from '@util/db';

// export const getSeqId = async (tableName: string): Promise<number | null> => {
//     try {
//         const repository: Repository<Counters> = dataSource.getRepository(Counters);

//         let counter = await repository.findOne({ where: { table: tableName } });

//         let newSeqId: number;
//         if (counter) {
//             newSeqId = counter.seq + 1;
//             await repository.update(counter.id, { seq: newSeqId });

//             counter = await repository.findOne({ where: { id: counter.id } });
//             return counter?.seq ? counter?.seq : 0;
//         } else {
//             newSeqId = 1000000001;
//             const newCounter = repository.create({ table: tableName, seq: newSeqId });
//             const getCounter = await repository.save(newCounter);
//             return getCounter?.seq ? getCounter?.seq : 0;
//         }
//     } catch (error) {
//         return Promise.reject(error);
//     }
// };
