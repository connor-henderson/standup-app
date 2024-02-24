import prisma from "../lib/prismadb";

const createBuddha = async () => {
  await prisma.author.create({
    data: {
      name: "Buddha",
      website: "https://www.buddhanet.net/",
      bio: 'Siddhartha Gautama, most commonly referred to as the Buddha, was a wandering ascetic and religious teacher who lived in South Asia during the 6th or 5th century BCE and founded Buddhism.\nAccording to Buddhist tradition, he was born in Lumbini in what is now Nepal, to royal parents of the Shakya clan, but renounced his home life to live as a wandering ascetic (Sanskrit: śramaṇa). Leading a life of begging, asceticism, and meditation, he attained enlightenment at Bodh Gaya in what is now India. The Buddha thereafter wandered through the lower Indo-Gangetic Plain, teaching and building a monastic order. He taught a Middle Way between sensual indulgence and severe asceticism, leading to Nirvana, that is, freedom from ignorance, craving, rebirth and suffering. His teachings are summarized in the Noble Eightfold Path, a training of the mind that includes meditation and instruction in Buddhist ethics, such as right effort, mindfulness, and jhana. He died in Kushinagar, attaining paranirvana. The Buddha has since been venerated by numerous religions and communities across Asia.\nA couple of centuries after his death he came to be known by the title Buddha, which means "Awakened One" or "Enlightened One." His teachings were compiled by the Buddhist community in the Vinaya, his codes for monastic practice, and the Sutta Piṭaka, a compilation of teachings based on his discourses. These were passed down in Middle Indo-Aryan dialects through an oral tradition.[[ Later generations composed additional texts, such as systematic treatises known as Abhidharma, biographies of the Buddha, collections of stories about his past lives known as Jataka tales, and additional discourses, i.e. the Mahayana sutras.',
      image:
        "http://imgc.artprintimages.com/img/print/jan-lakey-golden-buddha-lakeside_u-l-pz0v3y0.jpg",
      works: {
        create: {
          title: "Vinaya Pitaka",
          sections: ["Suttavibhaṅga", "Khandhaka", "Parivāra"],
          medium: "BOOK",
          externalUrl:
            "https://www.accesstoinsight.org/tipitaka/vin/index.html",
        },
      },
    },
  });
};

const createJackKornfield = async () => {
  await prisma.author.create({
    data: {
      name: "Jack Kornfield",
      website: "https://jackkornfield.com/",
      bio: "Jack Kornfield trained as a Buddhist monk in the monasteries of Thailand, India and Burma. He has taught meditation internationally since 1974 and is one of the key teachers to introduce Buddhist mindfulness practice to the West. After graduating from Dartmouth College in Asian Studies in 1967 he joined the Peace Corps and worked on tropical medicine teams in the Mekong River valley. He met and studied as a monk under the Buddhist master Ven. Ajahn Chah, as well as the Ven. Mahasi Sayadaw of Burma. Returning to the United States, Jack co-founded the Insight Meditation Society in Barre, Massachusetts, with fellow meditation teachers Sharon Salzberg and Joseph Goldstein and the Spirit Rock Center in Woodacre, California. Over the years, Jack has taught in centers and universities worldwide, led International Buddhist Teacher meetings, and worked with many of the great teachers of our time. He holds a Ph.D. in clinical psychology and is a father, husband and activist. His books have been translated into 20 languages and sold more than a million copies. They include, A Wise Heart: A Guide to the Universal Teachings of Buddhist Psychology, A Path with Heart; After the Ecstasy, the Laundry; Teachings of the Buddha; Seeking the Heart of Wisdom; Living Dharma; A Still Forest Pool; Stories of the Spirit, Stories of the Heart; Buddha’s Little Instruction Book; The Art of Forgiveness, Lovingkindness and Peace, Bringing Home the Dharma: Awakening Right Where You Are, and his most recent book, No Time Like the Present: Finding Freedom, Love, and Joy Right Where You Are",
      image:
        "https://jackkornfield.com/wp-content/uploads/2014/01/Jack-Kornfield_201blkwht_DeborahJaffe.jpg",
      works: {
        create: {
          title: "Heart Wisdom",
          sections: ["Episode 167 - The Perfection of Truthfulness"],
          medium: "PODCAST",
          externalUrl: "https://jackkornfield.com/podcasts-heart-wisdom/",
        },
      },
    },
  });
};

const main = async () => {
  try {
    await createBuddha();

    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
