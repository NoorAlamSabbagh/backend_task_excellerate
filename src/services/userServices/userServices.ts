import userModel, {IBwUser}  from "src/model/users";
import { FilterQuery, UpdateQuery } from "mongoose";

interface SelectOptions {
  type: 'count' | 'single' | 'many';
  condition: FilterQuery<IBwUser>;
  select?: string;
  sort?: Record<string, 1 | -1>;
  skip?: number;
  limit?: number;
}

/**********************************************************************
 * Function Name    :   select
 * Purpose          :   This function is used to get user data by condition.
 * Created By       :   Afsar Ali
 * Created Data     :   12-12-2024
 **********************************************************************/
export const select = async (options: SelectOptions): Promise<any> => {
  try {
    const { type, condition={}, select, sort = {}, skip = 0, limit = 0 } = options;

    if (type === 'count') {
      return await userModel.countDocuments(condition);
    } else if (type === 'single') {
      return await userModel.findOne(condition).select(select || '');
    } else {
      return await userModel
        .find(condition)
        .select(select || '')
        .sort(sort)
        .skip(skip)
        .limit(limit);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

/**********************************************************************
 * Function Name    :   updateData
 * Purpose          :   This function is used for update userModel
 * Created By       :   Afsar Ali
 * Created Data     :   12-12-2024
 **********************************************************************/
export const updateData = async (options: {
  condition: FilterQuery<IBwUser>;
  data: UpdateQuery<IBwUser>;
}): Promise<IBwUser | null> => {
  try {
    const { condition, data } = options;
    return await userModel.findOneAndUpdate(condition, data, { new: true });
  } catch (error) {
    return Promise.reject(error);
  }
};

/**********************************************************************
 * Function Name    :   createDate
 * Purpose          :   This function is used for create new
 * Created By       :   Afsar Ali
 * Created Data     :   12-12-2024
 **********************************************************************/
export const createDate = async (options: Partial<IBwUser>): Promise<IBwUser> => {
  try {
    return await userModel.create(options);
  } catch (error) {
    return Promise.reject(error);
  }
};