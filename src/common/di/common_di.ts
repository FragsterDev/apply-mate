//dependency injection for common files

import { prisma } from "../../config/database";
import CommonRepository from "../repository/repository";

const commonRepository = new CommonRepository(prisma);

export { commonRepository };
