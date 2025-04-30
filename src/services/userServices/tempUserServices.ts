// import { FindManyOptions, FindOneOptions } from 'typeorm';
// import { Temp_users } from "@db_tbl/Temp_users";
// import  dataSource  from '@util/db';

// interface QueryOptions {
//     type: 'count' | 'single' | 'many';
//     condition?: FindManyOptions<Temp_users>['where'];
//     select?: (keyof Temp_users)[];
//     sort?: FindManyOptions<Temp_users>['order'];
//     skip?: number;
//     limit?: number;
// }

// /**********************************************************************
//  * Function Name    :   select
//  * Purpose          :   This function is used for select from table
//  * Created By       :   Sumit Bedwal
//  * Created Data     :   03-03-2025
//  * Updated By       :   
//  * Update Data      :
//  **********************************************************************/
// export const select = async (options: QueryOptions ): Promise<any> => {
//     try {
//         const repository = dataSource.getRepository(Temp_users);
//         const { type = '', condition = {}, select, sort, skip, limit } = options;
//         if (type === 'count') {
//             return await repository.count({ where: condition });
//         } else if (type === 'single') {
//             const findOneOptions: FindOneOptions<Temp_users> = {
//             where: condition,
//             select: select as (keyof Temp_users)[] | undefined,
//             };
//             const result = await repository.findOne(findOneOptions);
//             if (!result) {
//                 return {}
//             }else{
//                 return result;
//             }
//         } else {
//             const findManyOptions: FindManyOptions<Temp_users> = {
//             where: condition,
//             select: select as (keyof Temp_users)[] | undefined,
//             order: sort,
//             skip,
//             take: limit,
//             };
//             return await repository.find(findManyOptions);
//         }
//     } catch (error) {
//         return Promise.reject(error);
//     }
// }; //End of function

//   /**********************************************************************
//  * Function Name    :   insert
//  * Purpose          :   This function is used for inserting data into the Temp_users table
//  * Created By       :   Your Name
//  * Created Data     :   03-03-2025
//  * Updated By       :   
//  * Update Data      :
//  **********************************************************************/
// export const createData = async (options: Partial<Temp_users>): Promise<Temp_users | {}> => {
//     try {
//       const repository = dataSource.getRepository(Temp_users);
  
//       // Insert the new user data
//       const result = await repository.save(options);
  
//       // Return the inserted user data or an empty object if insertion fails
//       if (!result) {
//         return {};
//       } else {
//         return result;
//       }
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   };



//  /**********************************************************************
//  * Function Name    :   updateData
//  * Purpose          :   This function is used for inserting data into the Temp_users table
//  * Created By       :   Sumit Bedwal
//  * Created Data     :   05-02-2025
//  * Updated By       :   
//  * Update Data      :
//  **********************************************************************/
//   export const updateData = async (id: string, options: Partial<Temp_users>): Promise<Temp_users | null> => {
//     try {
//       const repository = dataSource.getRepository(Temp_users);
  
//       // Find the user by ID
//       const result = await repository.update(id, options);

//       if (result.affected === 0) {
//         return null;
//       }
//       // Update the user data
//       return await repository.findOneBy({ id });
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   };
  

