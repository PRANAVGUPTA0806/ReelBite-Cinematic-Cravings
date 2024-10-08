const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },


    // Detailed Order Summary
    order_summary: {
      items: [
        {
          productId: { type: String, required: true },
          productImageUrl: { type: String },
          productName: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
          productDescription: { type: String },
        },
      ],
      totalPrice: {
        type: Number,
        required: true
      },
      
     
      order_date: {
        type: Date,
        default: Date.now
      },
      
      totalPrice: {  
        type: Number,
        required: true
      },
      payment_status: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: 'Paid'
      },
      
      // Payment History for complex payment handling
      payment_history: [
        {
          payment_method: { type: String },  // e.g., Credit Card, PayPal
          transaction_id: { type: String },
          payment_status: {
            type: String,
            enum: ['Pending', 'Paid', 'Failed'],
            default: 'Pending'
          },
          payment_date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    },
    // Billing Information
   
      billing_address: {
        address_line_1: { type: String},
        address_line_2: { type: String },
        admin_area_1: { type: String},
        admin_area_2: { type: String },
        postal_code: { type: String },
        country_code: { type: String },
        // phone: { type: String, required: true } // Optionally add phone number to billing
      },

      
    
    email_address:{ type: String,default:"-"},
    national_number: { type: String,default:"-"} ,
    paymentSource: { type: String },
    paymentID: { type: String },payment_status: {
      type: String,
      enum: ['Pending', 'COMPLETED', 'Failed'],
      default: 'Pending'
    },
    // Shipping Information
    
    // Order History for tracking status changes over time
    order_history: [
      {
        
        updated_at: {
          type: Date,
          default: Date.now
        },
        remarks: { type: String,default:'' } // Optional remarks explaining status change
      }
    ],
   
    timestamps: {
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
    }
  },
  { timestamps: true } // Automatically creates 'createdAt' and 'updatedAt' fields
);


// Middleware to automatically update 'updated_at' field on save
OrderSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
