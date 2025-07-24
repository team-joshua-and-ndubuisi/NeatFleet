-- CreateTable
CREATE TABLE "technicians_services" (
    "technician_id" UUID NOT NULL,
    "service_id" UUID NOT NULL,

    CONSTRAINT "technicians_services_pkey" PRIMARY KEY ("technician_id","service_id")
);

-- AddForeignKey
ALTER TABLE "technicians_services" ADD CONSTRAINT "technicians_services_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "technicians"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technicians_services" ADD CONSTRAINT "technicians_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
