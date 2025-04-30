// import { FindManyOptions, FindOneOptions } from 'typeorm';
// import { Schools } from "@db_tbl/Schools"
// import  dataSource  from '@util/db';

// interface QueryOptions {
//     type: 'count' | 'single' | 'many';
//     condition?: FindManyOptions<Schools>['where'];
//     select?: (keyof Schools)[];
//     sort?: FindManyOptions<Schools>['order'];
//     skip?: number;
//     limit?: number;
// }

// /**********************************************************************
//  * Function Name    :   selectSchool
//  * Purpose          :   This function is used for select school from table
//  * Created By       :   Sumit Bedwal
//  * Created Data     :   19-03-2025
//  * Updated By       :   
//  * Update Data      :
//  **********************************************************************/
// export const selectSchool = async (options: QueryOptions ): Promise<any> => {
//     try {
//         const repository = dataSource.getRepository(Schools);
//         const { type, condition = {}, select, sort, skip, limit } = options;
//         if (type === 'count') {
//             return await repository.count({ where: condition });
//         } else if (type === 'single') {
//             const findOneOptions: FindOneOptions<Schools> = {
//             where: condition,
//             select: select as (keyof Schools)[] | undefined,
//             };
//             const user = await repository.findOne(findOneOptions);
//             if (!user) {
//                 return {}
//             }else{
//                 return user;
//             }
//         } else {
//             const findManyOptions: FindManyOptions<Schools> = {
//             where: condition,
//             select: select as (keyof Schools)[] | undefined,
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
//  * Function Name    :   createData
//  * Purpose          :   This function is used for inserting data into the school table
//  * Created By       :   Sumit Bedwal
//  * Created Data     :   19-03-2025
//  * Updated By       :   
//  * Update Data      :
//  **********************************************************************/
// export const createData = async (options: Partial<Schools>): Promise<Schools | {}> => {
//     try {
//       const repository = dataSource.getRepository(Schools);
  
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
//  * Purpose          :   This function is used for inserting data into the school table
//  * Created By       :   Sumit Bedwal
//  * Created Data     :   19-02-2025
//  * Updated By       :   
//  * Update Data      :
//  **********************************************************************/
//  export const updateData = async (id: string, options: Partial<Schools>): Promise<Schools | null> => {
//   try {
//     const repository = dataSource.getRepository(Schools);

//     const result = await repository.update(id, options);

//     if (result.affected === 0) {
//       return null;
//     }
//     // Update the user data
//     return await repository.findOneBy({ id });
//   } catch (error) {
//     throw error; // Let the error propagate
//   }
// };


// /**********************************************************************
//  * Function Name    :   delete
//  * Purpose          :   This function is used for deleting data from the school table
//  * Created By       :   Sumit Bedwal
//  * Created Data     :   19-02-2025
//  * Updated By       :   
//  * Update Data      :
//  **********************************************************************/
// export const deleteData = async (id: string): Promise<boolean> => {
//   try {
//     const repository = dataSource.getRepository(Schools);

//     const result = await repository.delete(id);
//     // const result = await repository.softDelete(id);       // for softdelete 

//     if (result) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     throw error; // Let the error propagate
//   }
// };


  

