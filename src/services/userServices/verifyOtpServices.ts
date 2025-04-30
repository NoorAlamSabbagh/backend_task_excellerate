// import { FindManyOptions, FindOneOptions } from 'typeorm';
// import { Verifyotps } from "@db_tbl/Verifyotps"
// import dataSource from '@util/db';

// interface QueryOptions {
//   condition?: FindManyOptions<Verifyotps>['where'];
// }

// /**********************************************************************
//  * Function Name    :   selectOtp
//  * Purpose          :   This function is used for select from table Verifyotps
//  * Created By       :   Sumit Bedwal
//  * Created Data     :   02-03-2025
//  * Updated By       :   
//  * Update Data      :
//  **********************************************************************/
// export const selectOtp = async (options: QueryOptions): Promise<any> => {
//   try {
//     const repository = dataSource.getRepository(Verifyotps);
//     const { condition = {} } = options;
//       const findOneOptions: FindOneOptions<Verifyotps> = {
//         where: condition
//       };
//       const result = await repository.findOne(findOneOptions);
//       if (!result) {
//         return {}
//       } else {
//         return result;
//       }
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }; //End of function

// /**********************************************************************
// * Function Name    :   createOtp
// * Purpose          :   This function is used for inserting data into the Verifyotps table
// * Created By       :   Sumit Bedwal
// * Created Data     :   03-03-2025
// * Updated By       :   
// * Update Data      :
// **********************************************************************/
// export const createOtp = async (options: Partial<Verifyotps>): Promise<Verifyotps | {}> => {
//   try {
//     const repository = dataSource.getRepository(Verifyotps);

//     // Insert the new user data
//     const result = await repository.save(options);

//     // Return the inserted user data or an empty object if insertion fails
//     if (!result) {
//       return {};
//     } else {
//       return result;
//     }
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };



// /**********************************************************************
// * Function Name    :   deleteOtp
// * Purpose          :   This function is used for deleting data from the Verifyotps table
// * Created By       :   Sumit Bedwal
// * Created Data     :   03-03-2025
// * Updated By       :   
// * Update Data      :
// **********************************************************************/
// export const deleteOtp = async (loginid: string): Promise<boolean> => {
//   try {
//     const repository = dataSource.getRepository(Verifyotps);

//     const result = await repository.delete({ loginid : loginid });
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

// /**********************************************************************
// * Function Name    :   deleteByCondition
// * Purpose          :   This function is used for deleting data from the Verifyotps table
// * Created By       :   Sumit Bedwal
// * Created Data     :   03-03-2025
// * Updated By       :   
// * Update Data      :
// **********************************************************************/
// export const deleteByCondition = async (condition : Object): Promise<boolean> => {
//   try {
//     const repository = dataSource.getRepository(Verifyotps);
//     const result = await repository.delete(condition);
//     if (result) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     throw error; // Let the error propagate
//   }
// };


