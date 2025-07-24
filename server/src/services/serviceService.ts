import prismaClient from '../config/prisma'; // Ensure your db connection is set up correctly

const getAllServices = async () => {
  try {
    const services = await prismaClient.service.findMany();

    if (!services || services.length === 0) {
      throw new Error('No services found');
    }

    return services;
  } catch (error: any) {
    throw new Error(`Error fetching services: ${error.message}`);
  }
};

const createService = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  try {
    const service = await prismaClient.service.create({
      data: {
        name,
        description,
      },
    });

    return service;
  } catch (error: any) {
    throw new Error(
      `Error creating service with name "${name}": ${error.message}`
    );
  }
};

const addServiceToTechnician = async (
  technicianId: string,
  serviceId: string
) => {
  try {
    await prismaClient.technicianService.create({
      data: {
        technician_id: technicianId,
        service_id: serviceId,
      },
    });
  } catch (error: any) {
    throw new Error(
      `Error linking technician ${technicianId} to service ${serviceId}: ${error.message}`
    );
  }
};

const getTechnicianServices = async (technicianId: string) => {
  try {
    const services = await prismaClient.technicianService.findMany({
      where: {
        technician_id: technicianId,
      },
      include: {
        service: true, // fetch full service object
      },
    });

    return services.map(entry => entry.service);
  } catch (error: any) {
    throw new Error(
      `Error fetching services for technician ${technicianId}: ${error.message}`
    );
  }
};

export {
  getAllServices,
  createService,
  addServiceToTechnician,
  getTechnicianServices,
};
