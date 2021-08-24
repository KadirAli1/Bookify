import { HttpStatus } from '@nestjs/common';

export const APIErrors = {
  UserErrors: {
    AuthenticationFailed: {
      code: 'U-001',
      statusCode: HttpStatus.UNAUTHORIZED,
      message: `User  couldn't be verified!`,
      reason: `jwtToken failed verification!`,
    },
    NonExisting: {
      code: 'U-002',
      statusCode: HttpStatus.NOT_FOUND,
      message: `User not found!`,
      reason: `user_id doesn't match any user in our DB!`,
    },
    NonOwner: {
      code: 'U-003',
      statusCode: HttpStatus.UNAUTHORIZED,
      message: `User is not owner of given entity!`,
      reason: `sender of request is not owner of the entity!`,
    },
  },
  EntityErrors: {
    OnCreate: {
      code: 'S-001',
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Entity couldn't be created!`,
      reason: `Entity couldn't be created!`,
    },
    OnUpdate: {
      code: 'S-002',
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Entity couldn't be updated!`,
      reason: `A service with the same name already exists!`,
    },
    ServiceErrors: {
      OnCreate: {
        code: 'S-S-001',
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Entity service couldn't be created!`,
        reason: `A service with the given name possibly already exists!`,
      },
      OnUpdate: {
        code: 'S-S-002',
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Entity service couldn't be updated!`,
        reason: `A service with the given name wasn't found!`,
      },
      OnRemove: {
        code: 'S-S-003',
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Entity service couldn't be removed!`,
        reason: `A service with the given name wasn't found!`,
      },
    },
    OwnerErrors: {
      OnCreate: {
        code: 'S-O-001',
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Entity owner couldn't be created!`,
        reason: `Selected user doesn't exist or it is already an owner!`,
      },
    },
  },
  BookingErrors: {
    OnCreate: {
      code: 'B-001',
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Booking couldn't be created!`,
      reason: `Booking couldn't be created!`,
    },
  },
};
