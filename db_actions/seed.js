const { PrismaClient } = require('@prisma/client')
const tracks = require('./id_track_mapping.json')

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < tracks.mapping.length; i++) {
    console.log(tracks.mapping[i][String(i)])
    await prisma.tracks.create({
      data: {
        id_mapping: i,
        track_uri_id: tracks.mapping[i][String(i)],
      },
    })
  }
}

;(async () => {
  try {
    console.log('Seeding...')
    await main()
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
})()
