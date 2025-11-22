import { GetServerSideProps } from 'next';
import { prisma } from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.params?.code as string;
  const link = await prisma.link.findUnique({ where: { code }});
  if (!link) {
    return { notFound: true };
  }

  await prisma.link.update({
    where: { code },
    data: { clicks: { increment: 1 }, lastClicked: new Date() }
  });

  return {
    redirect: {
      destination: link.targetUrl,
      permanent: false,
    }
  }
}

export default function RedirectPage() {
  return null;
}
