import connectToDatabase from './mongodb';
import User from './models/user';
import Product from './models/product';
import Order from './models/order';

export async function initializeDatabase() {
  try {
    await connectToDatabase();
    
    // Create indexes for better performance
    await User.createIndexes();
    await Product.createIndexes();
    await Order.createIndexes();
    
    console.log('✅ Database initialized successfully');
    console.log('✅ All indexes created');
    
    return { success: true, message: 'Database initialized successfully' };
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return { success: false, error: error };
  }
}

export async function seedDatabase() {
  try {
    await connectToDatabase();
    
    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      // Create default admin user
      const adminUser = new User({
        clerkId: 'admin_default',
        email: 'officialbhuppiiydv@gmail.com',
        name: 'BhuDhan Admin',
        phone: '+917206110977',
        role: 'admin',
        address: {
          city: 'Rewari',
          state: 'Haryana',
          pincode: '123101'
        },
        preferredLanguage: 'en',
        isVerified: true,
      });
      
      await adminUser.save();
      console.log('✅ Admin user created');
    }
    
    // Add sample crop types for farmers
    const sampleCrops = [
      'Rice', 'Wheat', 'Maize', 'Sugarcane', 'Cotton', 'Soybean', 
      'Groundnut', 'Sunflower', 'Mustard', 'Barley', 'Gram', 'Lentil',
      'Potato', 'Onion', 'Tomato', 'Cabbage', 'Cauliflower', 'Brinjal'
    ];
    
    console.log('✅ Sample crop types available:', sampleCrops.join(', '));
    
    return { 
      success: true, 
      message: 'Database seeded successfully',
      sampleCrops 
    };
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    return { success: false, error: error };
  }
}
