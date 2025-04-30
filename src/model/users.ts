import { Schema, model, Types, Document } from 'mongoose';

// Define the TypeScript interface for bw_users
export interface IBwUser extends Document {
  users_type: string;
  users_id: number;
  users_name: string;
  last_name: string;
  country_code: string;
  users_mobile: number;
  users_email?: string;
  password: string;
  status: 'A' | 'I' | 'B' | 'D';
  token?: string;
  created_ip?: string;
  created_by?: Types.ObjectId;
  updated_ip?: string;
  updated_by?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose Schema definition
const bwUserSchema = new Schema<IBwUser>(
  {
    users_id: { type: Number, trim: true, required: true },
    users_name: { type: String, trim: true, required: true },
    last_name: { type: String, trim: true, required: true },
    country_code: { type: String, trim: true, required: true },
    users_mobile: { type: Number, trim: true, required: true },
    users_email: { type: String, trim: true },
    password: { type: String, trim: true, required: true },
    status: { type: String, enum: ['A', 'I', 'B', 'D'], default: 'A' },
    token: { type: String },
    created_ip: { type: String, trim: true },
    created_by: { type: Schema.Types.ObjectId, trim: true },
    updated_ip: { type: String, trim: true },
    updated_by: { type: Schema.Types.ObjectId, trim: true },
  },
  { timestamps: true }
);

// Export the model
export default model<IBwUser>('bw_users', bwUserSchema);
