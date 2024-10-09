import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrateEntities1728454963394 implements MigrationInterface {
  name = 'MigrateEntities1728454963394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact_point" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "number" character varying NOT NULL, "callerId" uuid, CONSTRAINT "UQ_78fb4f4bfa5e9faaecc5434479c" UNIQUE ("number"), CONSTRAINT "PK_a4953bfa453e555c2185e51dd4a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "prosoft_note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "prosoftId" character varying(255) NOT NULL, "coEmployeeId" uuid, CONSTRAINT "REL_5886a9080303fc5cf0e347635d" UNIQUE ("prosoftId"), CONSTRAINT "PK_788ff3049500b8e80054333520e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "prosoft_co_employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, CONSTRAINT "PK_aeedc45d3d09a6a2293e6b4e3c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "caller" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "name" character varying(255) NOT NULL, "jiraId" uuid NOT NULL, "prosoftId" uuid, "isCoEmployee" boolean NOT NULL DEFAULT false, CONSTRAINT "REL_515e70769645d9debed3152bfe" UNIQUE ("jiraId"), CONSTRAINT "REL_208b577b69bca735128b8472a5" UNIQUE ("prosoftId"), CONSTRAINT "PK_3bed5e1e316e15c0b87cccd8504" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "jira_organisation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, CONSTRAINT "PK_76074639e1927c0ff8e24a38d3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "jira_issue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "targetId" uuid, CONSTRAINT "PK_304a66e72cbb74089ad1c3b967d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "jira_comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "issueId" uuid, CONSTRAINT "PK_4d78bb97362f0ef9b60e3b1e4b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "title" character varying(255) NOT NULL, "desc" text NOT NULL, "sessionId" uuid NOT NULL, "prosoftId" character varying(255) NOT NULL, "jiraId" uuid, CONSTRAINT "UQ_c42700c545c85d5906239072596" UNIQUE ("prosoftId"), CONSTRAINT "REL_c369a38a5c0448f05587fd6a0d" UNIQUE ("jiraId"), CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "jiraIssueId" uuid, "ringCentralId" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "startAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endAt" TIMESTAMP WITH TIME ZONE NOT NULL, "callerId" uuid, CONSTRAINT "REL_45cb64c1cac54c416e769652c2" UNIQUE ("jiraIssueId"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "call" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "callerNumber" character varying NOT NULL, "calleeNumber" character varying NOT NULL, "userOrganisationId" uuid, CONSTRAINT "PK_2098af0169792a34f9cfdd39c47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_organisation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "name" character varying NOT NULL, "defaultNumber" character varying NOT NULL, CONSTRAINT "PK_c7a4825eaaf9118259b890ad65d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organisation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "name" character varying NOT NULL, "defaultNumber" character varying(255) NOT NULL, "ringCentralId" uuid NOT NULL, "ringCentralApiKey" character varying(255) NOT NULL, "jiraId" character varying(255) NOT NULL, "jiraApiKey" character varying(255) NOT NULL, "prosoftId" character varying(255) NOT NULL, "prosoftApiKey" character varying(255) NOT NULL, CONSTRAINT "REL_a88797b90403169b0868ffbdd0" UNIQUE ("ringCentralId"), CONSTRAINT "PK_c725ae234ef1b74cce43d2d00c1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "name" character varying NOT NULL, "extension" character varying(255) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "organisationId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session_callees" ("session_id" uuid NOT NULL, "callee_id" uuid NOT NULL, CONSTRAINT "PK_75f24573c20a2eb84cfc83ebc63" PRIMARY KEY ("session_id", "callee_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a03278ff4092dc565dee2da0d9" ON "session_callees" ("session_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7602c112400bac57c66ab9404f" ON "session_callees" ("callee_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_session" ("user_id" uuid NOT NULL, "session_id" uuid NOT NULL, CONSTRAINT "PK_529607b3083c0ff6d138fbb7361" PRIMARY KEY ("user_id", "session_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13275383dcdf095ee29f2b3455" ON "user_session" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_50c2b6e58a37166dab435111f2" ON "user_session" ("session_id") `,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "extension"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organisationId"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "createdBy"`);
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "REL_45cb64c1cac54c416e769652c2"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "jiraIssueId"`);
    await queryRunner.query(
      `ALTER TABLE "session" DROP COLUMN "ringCentralId"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "startAt"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "endAt"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "callerId"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "createdBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "session" ADD "jiraIssueId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "UQ_45cb64c1cac54c416e769652c23" UNIQUE ("jiraIssueId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "ringCentralId" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "title" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "startAt" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "endAt" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "session" ADD "callerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "extension" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "organisationId" uuid`);
    await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "provider" character varying NOT NULL DEFAULT 'email'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "socialId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f" UNIQUE ("photoId")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "roleId" integer`);
    await queryRunner.query(`ALTER TABLE "user" ADD "statusId" integer`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "hash" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "session" ADD "userId" uuid`);
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_point" ADD CONSTRAINT "FK_87c6dccd3731ad1f900e947b7c5" FOREIGN KEY ("callerId") REFERENCES "caller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prosoft_note" ADD CONSTRAINT "FK_5886a9080303fc5cf0e347635dc" FOREIGN KEY ("prosoftId") REFERENCES "note"("prosoftId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prosoft_note" ADD CONSTRAINT "FK_a05ff251ff10b9b346a92442155" FOREIGN KEY ("coEmployeeId") REFERENCES "prosoft_co_employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "caller" ADD CONSTRAINT "FK_515e70769645d9debed3152bfe4" FOREIGN KEY ("jiraId") REFERENCES "jira_organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "caller" ADD CONSTRAINT "FK_208b577b69bca735128b8472a58" FOREIGN KEY ("prosoftId") REFERENCES "prosoft_co_employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "jira_issue" ADD CONSTRAINT "FK_d13734e7aaa5eee798d9d1fc0b9" FOREIGN KEY ("targetId") REFERENCES "jira_organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "jira_comment" ADD CONSTRAINT "FK_74226563c8fc7d810abd6fb1959" FOREIGN KEY ("issueId") REFERENCES "jira_issue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" ADD CONSTRAINT "FK_9c39cc2f057f250fb274a1610f5" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" ADD CONSTRAINT "FK_c369a38a5c0448f05587fd6a0d9" FOREIGN KEY ("jiraId") REFERENCES "jira_comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_d0a75a02a838bf174894e37292a" FOREIGN KEY ("callerId") REFERENCES "caller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_45cb64c1cac54c416e769652c23" FOREIGN KEY ("jiraIssueId") REFERENCES "jira_issue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "call" ADD CONSTRAINT "FK_6fd444518d7833f93f461206d55" FOREIGN KEY ("userOrganisationId") REFERENCES "user_organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" ADD CONSTRAINT "FK_a88797b90403169b0868ffbdd07" FOREIGN KEY ("ringCentralId") REFERENCES "user_organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_642763a1acbc9672d38429ea62a" FOREIGN KEY ("organisationId") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_callees" ADD CONSTRAINT "FK_a03278ff4092dc565dee2da0d90" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_callees" ADD CONSTRAINT "FK_7602c112400bac57c66ab9404f5" FOREIGN KEY ("callee_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_session" ADD CONSTRAINT "FK_13275383dcdf095ee29f2b3455a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_session" ADD CONSTRAINT "FK_50c2b6e58a37166dab435111f25" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_session" DROP CONSTRAINT "FK_50c2b6e58a37166dab435111f25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_session" DROP CONSTRAINT "FK_13275383dcdf095ee29f2b3455a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_callees" DROP CONSTRAINT "FK_7602c112400bac57c66ab9404f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_callees" DROP CONSTRAINT "FK_a03278ff4092dc565dee2da0d90"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_642763a1acbc9672d38429ea62a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" DROP CONSTRAINT "FK_a88797b90403169b0868ffbdd07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "call" DROP CONSTRAINT "FK_6fd444518d7833f93f461206d55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_45cb64c1cac54c416e769652c23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_d0a75a02a838bf174894e37292a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" DROP CONSTRAINT "FK_c369a38a5c0448f05587fd6a0d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" DROP CONSTRAINT "FK_9c39cc2f057f250fb274a1610f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jira_comment" DROP CONSTRAINT "FK_74226563c8fc7d810abd6fb1959"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jira_issue" DROP CONSTRAINT "FK_d13734e7aaa5eee798d9d1fc0b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "caller" DROP CONSTRAINT "FK_208b577b69bca735128b8472a58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "caller" DROP CONSTRAINT "FK_515e70769645d9debed3152bfe4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prosoft_note" DROP CONSTRAINT "FK_a05ff251ff10b9b346a92442155"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prosoft_note" DROP CONSTRAINT "FK_5886a9080303fc5cf0e347635dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_point" DROP CONSTRAINT "FK_87c6dccd3731ad1f900e947b7c5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "hash"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "socialId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organisationId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "extension"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "callerId"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "endAt"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "startAt"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "session" DROP COLUMN "ringCentralId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "UQ_45cb64c1cac54c416e769652c23"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "jiraIssueId"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "session" ADD "callerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "endAt" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "startAt" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "title" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "ringCentralId" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "session" ADD "jiraIssueId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "REL_45cb64c1cac54c416e769652c2" UNIQUE ("jiraIssueId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "createdBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "organisationId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "extension" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_50c2b6e58a37166dab435111f2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_13275383dcdf095ee29f2b3455"`,
    );
    await queryRunner.query(`DROP TABLE "user_session"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7602c112400bac57c66ab9404f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a03278ff4092dc565dee2da0d9"`,
    );
    await queryRunner.query(`DROP TABLE "session_callees"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "organisation"`);
    await queryRunner.query(`DROP TABLE "user_organisation"`);
    await queryRunner.query(`DROP TABLE "call"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "note"`);
    await queryRunner.query(`DROP TABLE "jira_comment"`);
    await queryRunner.query(`DROP TABLE "jira_issue"`);
    await queryRunner.query(`DROP TABLE "jira_organisation"`);
    await queryRunner.query(`DROP TABLE "caller"`);
    await queryRunner.query(`DROP TABLE "prosoft_co_employee"`);
    await queryRunner.query(`DROP TABLE "prosoft_note"`);
    await queryRunner.query(`DROP TABLE "contact_point"`);
  }
}
