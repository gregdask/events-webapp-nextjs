import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * TypeScript interface for Booking document
 * Extends mongoose Document to include all Booking fields
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event', // Reference to Event model
      required: [true, 'Event ID is required'],
      index: true, // Index for faster queries
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

/**
 * Pre-save hook to validate that the referenced Event exists
 * Prevents orphaned bookings by checking event existence before saving
 */
BookingSchema.pre('save', async function (next) {
  // Only validate eventId if it's modified or document is new
  if (this.isModified('eventId')) {
    try {
      // Dynamically import Event model to avoid circular dependency
      const Event = mongoose.models.Event || (await import('./event.model')).default;
      
      const eventExists = await Event.findById(this.eventId);
      
      if (!eventExists) {
        return next(new Error('Referenced event does not exist'));
      }
    } catch (error) {
      return next(new Error('Failed to validate event reference'));
    }
  }
  
  next();
});

// Add index on eventId for efficient queries (e.g., finding all bookings for an event)
BookingSchema.index({ eventId: 1 });

// Add compound index for preventing duplicate bookings (optional, uncomment if needed)
// BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Prevent model recompilation in Next.js development hot reloads
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
