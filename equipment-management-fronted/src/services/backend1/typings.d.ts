declare namespace API {
  type ChangePasswordDTO = {
    id?: number;
    oldPassword?: string;
    newPassword?: string;
  };

  type Category = {
    id?: number;
    name?: string;
    description?: string;
    createUser?: number;
    updateUser?: number;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
  };

  type AllCategoryVO = {
    id?: number;
    name?: string;
  }

  type AllLocationVO = {
    id?: number;
    name?: string;
  };

  type CategoryDTO = {
    id?: number;
    name?: string;
    description?: string;
    createUser?: number;
    updateUser?: number;
  };

  type CategoryVO = {
    id?: number;
    name?: string;
    description?: string;
    createUserName?: string;
    updateUserName?: string;
    createTime?: string;
    updateTime?: string;
  };

  type CategoryPageQueryDTO = {
    page?: number;
    pageSize?: number;
    name?: string;
  };

  type changeStatusParams = {
    id: number;
  };

  type delete1Params = {
    id: number;
  };

  type deleteByIdParams = {
    id: number;
    userId: number;
  };

  type deleteByLocationIdParams = {
    id: number;
  };

  type deleteUsingGETParams = {
    id: number;
  };

  type Device = {
    id?: number;
    name?: string;
    imageUrl?: string;
    model?: string;
    serialNumber?: string;
    warrantyPeriod?: number;
    categoryId?: number;
    status?: number;
    maintainerId?: number;
    locationId?: number;
    description?: string;
    lastMaintenanceTime?: string;
    nextMaintenanceTime?: string;
    discardTime?: string;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
  };

  type DeviceChangeStatusDTO = {
    id?: number;
    userId?: number;
    status?: number;
    faultDescription?: string;
  };

  type DeviceDTO = {
    id?: number;
    name?: string;
    imageUrl?: string;
    model?: string;
    serialNumber?: string;
    warrantyPeriod?: number;
    // categoryId?: number;
    status?: number;
    maintainerId?: number;
    locationName?: number;
    description?: string;
    lastMaintenanceTime?: string;
    nextMaintenanceTime?: string;
    discardTime?: string;
    updateTime?: string;
    categoryName?: number;
  };

  type DeviceVO = {
    id?: number;
    name?: string;
    imageUrl?: string;
    model?: string;
    serialNumber?: string;
    warrantyPeriod?: number;
    status?: number;
    description?: string;
    lastMaintenanceTime?: string;
    nextMaintenanceTime?: string;
    discardTime?: string;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
    categoryName?: string;
    maintainerName?: string;
    locationName?: string;
    categoryId?: number;
    locationId?: number
  };

  type DevicePageQueryDTO = {
    page?: number;
    pageSize?: number;
    name?: string;
    model?: string;
    categoryName?: number;
    status?: string;
    categoryId?: number;
    locationId?: number;
  };

  type getById1Params = {
    id: number;
  };

  type getByIdParams = {
    id: number;
  };

  type LocationDTO = {
    id?: number;
    name?: string;
    type?: number;
    description?: string;
  };

  type Location = {
    id?: number;
    name?: string;
    type?: number;
    description?: string;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
  };

  type LocationPageQueryDTO = {
    page?: number;
    pageSize?: number;
    name?: string;
    type?: number;
  };

  type MaintenanceOrderPageQueryDTO = {
    page?: number;
    pageSize?: number;
    status?: number;
    userId?: number;
  };

  type MaintenanceOrderVO = {
    id?: number;
    deviceName?: string;
    reporterName?: string;
    reportTime?: string;
    faultDescription?: string;
    status?: number;
    assigneeName?: string;
    assignTime?: string;
    repairStartTime?: string;
    repairEndTime?: string;
    repairCost?: number;
    repairResult?: string;
    cancelReason?: string;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
  }

  type MaintenanceOrderChangeStatusDTO = {
    id?: number;
    status?: number;
    repairCost?: number;
    cancelReason?: string;
    repairResult?: string;
  };

  type page1Params = {
    categoryPageQueryDTO: CategoryPageQueryDTO;
  };

  type page2Params = {
    userPageQueryDTO: UserPageQueryDTO;
  };

  type pageOfLocationParams = {
    locationPageQueryDTO: LocationPageQueryDTO;
  };

  type pageOfMaintenanceOrderParams = {
    maintenanceOrderPageQueryDTO: MaintenanceOrderPageQueryDTO;
  };

  type pageParams = {
    devicePageQueryDTO: DevicePageQueryDTO;
  };

  type PageResult = {
    total?: number;
    records?: Record<string, any>[];
  };

  type Result = {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
  };

  type ResultBoolean = {
    code?: number;
    msg?: string;
    data?: boolean;
  };

  type ResultDevice = {
    code?: number;
    msg?: string;
    data?: Device;
  };

  type ResultListAllLocationVO = {
    code?: number;
    msg?: string;
    data?: { id: number; name: string }[];
  };

  type ResultListCategory = {
    code?: number;
    msg?: string;
    data?: { id: number; name: string }[];
  };

  type ResultPageResult = {
    code?: number;
    msg?: string;
    data?: PageResult;
  };

  type ResultString = {
    code?: number;
    msg?: string;
    data?: string;
  };

  type ResultUser = {
    code?: number;
    msg?: string;
    data?: User;
  };

  type ResultUserLoginVO = {
    code?: number;
    msg?: string;
    data?: UserLoginVO;
  };

  type startOrStopParams = {
    status: number;
    id: number;
  };

  type User = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userPassword?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStatus?: number;
    userRole?: number;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
  };

  type UserLoginDTO = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserLoginVO = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userRole?: number;
    avatarUrl?: string;
    createTime?: string;
    updateTime?: string;
  };

  type UserPageQueryDTO = {
    userName?: string;
    userAccount?: string;
    userStatus?: number;
    userRole?: string;
    page?: number;
    pageSize?: number;
  };

  type UserRegisterDTO = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    userRole?: number;
  };

  type UserUpdateDTO = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userPassword?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStatus?: number;
    userRole?: number;
  };

  type uploadParams = {
    file: string;
  };
}
