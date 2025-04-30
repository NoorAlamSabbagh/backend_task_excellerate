import { sendResponse, build } from '@util/response';
import { Request, Response } from 'express';
import { select} from "@services/userServices/userServices";

interface QueryOptions {
    type: 'count' | 'single' | 'many';
    condition: any; // Make condition required
    skip?: number;
    limit?: number;
}


/******************** Custom request  ********************/
interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}
/******************** Custom request  ********************/


/**********************************************************************
 * Function Name    :   getUsers
 * Purpose          :   This function is used to get data from the users table
 * Created By       :   Afsar Ali
 * Created Data     :   08-02-2025
 * Updated By       :   
 * Update Data      :
 **********************************************************************/
const getUsers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId: number | undefined  = req.user?.userId ? parseInt(req.user.userId) : undefined;
    if (userId === undefined) {
      return sendResponse(res, build("PERMISSION_ERROR"));
    }

    const {type, condition} = req.body;
    const option: QueryOptions = { 
      type: type || "many",
      condition: condition || {} // Ensure condition is always defined and required
    };
    const result = await select(option);
    return sendResponse(res, build("SUCCESS",{result}));
  } catch (error) {
    console.log('error',error);
    return sendResponse( res, build("ERROR_SERVER_ERROR", { })
    );
  }
};


/******************** Custom request  ********************/
interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}
/******************** Custom request  ********************/


export default {
  getUsers
};