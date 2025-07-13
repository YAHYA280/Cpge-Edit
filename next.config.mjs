import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

// const aws_files_url = process.env.NEXT_PUBLIC_AWS_FILES_URL


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cpe-uploads-main.s3.us-east-1.amazonaws.com', 'cpeedu.com'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            }
        ]
    },

    // i18n: {
    //     locales: ['en', 'ar'],
    //     defaultLocale: 'en',
    // },

    // eslint: {
    //     // Warning: This allows production builds to successfully complete even if
    //     // your project has ESLint errors.
    //     ignoreDuringBuilds: true,
    // },
};

// export default nextConfig;
export default withNextIntl(nextConfig);