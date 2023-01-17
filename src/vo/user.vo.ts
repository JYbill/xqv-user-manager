import type { User } from "@prisma/client";

import { Rule, RuleType } from "@midwayjs/validate";

export class UserVo implements User {
  @Rule(RuleType.string())
  id: string;
  @Rule(RuleType.string())
  username: string;
  @Rule(RuleType.string())
  nickname: string;
  @Rule(RuleType.string().min(6))
  password: string;
  @Rule(RuleType.forbidden())
  salt: string;
  @Rule(RuleType.forbidden())
  gmt_create: Date;
  @Rule(RuleType.forbidden())
  gmt_modified: Date;
  @Rule(RuleType.forbidden())
  isAdmin: boolean;
}
