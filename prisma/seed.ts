import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME || "admin";
  const password = process.env.SEED_ADMIN_PASSWORD || "admin123";

  const existing = await prisma.adminUser.findUnique({ where: { username } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.adminUser.create({ data: { username, passwordHash } });
    console.log(`Admin user created -> username: ${username} / password: ${password}`);
    console.log("PENTING: segera login dan ganti password ini.");
  } else {
    console.log("Admin user sudah ada, dilewati.");
  }

  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      serverName: "CraftHaven",
      tagline: "Survival Semi-Vanilla, Ekonomi Berkembang, Komunitas Ramah.",
      aboutContent:
        "CraftHaven berdiri dari keinginan sekelompok pemain untuk membangun dunia survival yang adil, stabil, dan bebas dari toxic. Kami menjaga performa server, mendengarkan masukan pemain, dan terus mengembangkan fitur baru setiap bulan."
    }
  });

  await prisma.serverInfo.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  });

  const featureCount = await prisma.feature.count();
  if (featureCount === 0) {
    await prisma.feature.createMany({
      data: [
        { icon: "Swords", title: "Survival Murni", description: "Ekonomi, land claim, dan PvP zone yang seimbang untuk semua pemain.", order: 0 },
        { icon: "ShieldCheck", title: "Anti Griefing", description: "Sistem proteksi lahan otomatis, tidak perlu takut hasil kerja hilang.", order: 1 },
        { icon: "Users", title: "Komunitas Ramah", description: "Staff aktif 24/7 dan komunitas yang suportif untuk pemain baru.", order: 2 },
        { icon: "Sparkles", title: "Event Rutin", description: "Event mingguan dengan hadiah menarik, dari boss battle hingga build contest.", order: 3 }
      ]
    });
  }

  const faqCount = await prisma.faqItem.count();
  if (faqCount === 0) {
    await prisma.faqItem.createMany({
      data: [
        { question: "Apakah server ini whitelist?", answer: "Tidak, server terbuka untuk umum. Cukup masuk menggunakan IP server.", order: 0 },
        { question: "Apakah tersedia untuk Bedrock?", answer: "Ya, gunakan Bedrock Port yang tertera di bagian Informasi Server.", order: 1 },
        { question: "Bagaimana cara vote server?", answer: "Klik tombol Vote Server di halaman utama, vote setiap hari untuk mendapat reward.", order: 2 }
      ]
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
