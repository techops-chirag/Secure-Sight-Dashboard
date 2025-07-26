import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create cameras
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: 'Shop Floor A',
        location: 'Building A - Floor 1',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Vault',
        location: 'Building B - Basement',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Main Entrance',
        location: 'Building A - Ground Floor',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Parking Lot',
        location: 'Outdoor - Section C',
      },
    }),
  ]);

  const threatTypes = ['Unauthorised Access', 'Gun Threat', 'Face Recognised', 'Suspicious Activity'];
  
  // Generate incidents over 24 hours
  const now = new Date();
  const incidents = [];

  for (let i = 0; i < 15; i++) {
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    const duration = Math.floor(Math.random() * 300) + 30;
    
    const startTime = new Date(now.getTime() - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000));
    const endTime = new Date(startTime.getTime() + (duration * 1000));
    
    incidents.push({
      cameraId: cameras[Math.floor(Math.random() * cameras.length)].id,
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      tsStart: startTime,
      tsEnd: endTime,
      // IMPORTANT: Remove '/public' from the path - Next.js serves from root
      thumbnailUrl: `/thumbnails/thumb-${(i % 5) + 1}.jpeg`, // Use modulo to cycle through available images
      resolved: Math.random() > 0.7,
    });
  }

  await prisma.incident.createMany({
    data: incidents,
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
