import { ForbiddenException } from "app/exceptions/forbidden.exception";
import { User } from "app/models/user.model";

type Role = "admin" | "manager" | "hr" | "user";

class AuthorizationService {
  hasRole(userRole: string, allowedRoles: Role[]): void {
    if (!allowedRoles.includes(userRole as Role)) {
      throw new ForbiddenException(
        "You don't have permission to access this resource. Required role: " +
          allowedRoles.join(" or ")
      );
    }
  }

  canAccessResource(
    authenticatedUser: User,
    resourceOwnerId: number,
    allowedRoles: Role[] = ["admin", "hr", "manager"]
  ): void {
    const userRole = authenticatedUser.role as Role;

    if (allowedRoles.includes(userRole)) {
      return;
    }

    if (authenticatedUser.id === resourceOwnerId) {
      return;
    }

    throw new ForbiddenException(
      "You don't have permission to access this resource"
    );
  }
}

export { AuthorizationService };
