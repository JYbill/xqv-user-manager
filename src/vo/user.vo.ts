import type { User } from "@prisma/client";

import { Rule, RuleType } from "@midwayjs/validate";

export class UserVo implements User {
  webToken: string;
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
  isAdmin: boolean;
  @Rule(RuleType.forbidden())
  gmtCreate: Date;
  @Rule(RuleType.forbidden())
  gmtModified: Date;
}
