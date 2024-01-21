-- CreateTable
CREATE TABLE "division" (
    "id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "id" TEXT NOT NULL,
    "employee_number" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT,
    "lastname" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "classification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jo_approver_setting" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "approver_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "jo_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rv_approver_setting" (
    "id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "rv_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spr_approver_setting" (
    "id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "spr_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meqs_approver_setting" (
    "id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "meqs_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_approver_setting" (
    "id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "po_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "division_code_key" ON "division"("code");

-- CreateIndex
CREATE UNIQUE INDEX "department_code_key" ON "department"("code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_employee_number_key" ON "employee"("employee_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_employee_id_key" ON "user"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "jo_approver_setting_order_key" ON "jo_approver_setting"("order");

-- CreateIndex
CREATE UNIQUE INDEX "jo_approver_setting_approver_id_key" ON "jo_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "rv_approver_setting_approver_id_key" ON "rv_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "rv_approver_setting_order_key" ON "rv_approver_setting"("order");

-- CreateIndex
CREATE UNIQUE INDEX "spr_approver_setting_approver_id_key" ON "spr_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "spr_approver_setting_order_key" ON "spr_approver_setting"("order");

-- CreateIndex
CREATE UNIQUE INDEX "meqs_approver_setting_approver_id_key" ON "meqs_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "meqs_approver_setting_order_key" ON "meqs_approver_setting"("order");

-- CreateIndex
CREATE UNIQUE INDEX "po_approver_setting_approver_id_key" ON "po_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "po_approver_setting_order_key" ON "po_approver_setting"("order");

-- AddForeignKey
ALTER TABLE "division" ADD CONSTRAINT "division_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jo_approver_setting" ADD CONSTRAINT "jo_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rv_approver_setting" ADD CONSTRAINT "rv_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spr_approver_setting" ADD CONSTRAINT "spr_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_approver_setting" ADD CONSTRAINT "meqs_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approver_setting" ADD CONSTRAINT "po_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
