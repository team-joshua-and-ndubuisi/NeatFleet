import { z } from 'zod';

const idSchema = z
  .string()
  .regex(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    {
      message: 'Invalid ID format.',
    }
  );

const validateId = (id: string) => {
  idSchema.parse(id);
};

export { validateId };
