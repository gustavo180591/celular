import { json } from '@sveltejs/kit';
import prisma from '$lib/server/db';

export async function GET() {
  try {
    const devices = await prisma.device.findMany({
      where: {
        status: 'IN_STOCK' // Only show devices that are in stock
      },
      select: {
        id: true,
        brand: true,
        model: true,
        color: true,
        capacity: true,
        condition: true,
        price: true,
        notes: true,
        images: true,
        accessories: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return json(
      { error: 'Error al cargar los dispositivos' },
      { status: 500 }
    );
  }
}
