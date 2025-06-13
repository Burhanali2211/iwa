const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test creating a user
    const testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
        role: 'STUDENT'
      }
    });
    
    console.log('✅ Test user created:', testUser);
    
    // Clean up
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    
    console.log('✅ Test user deleted');
    console.log('✅ Database test completed successfully');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
