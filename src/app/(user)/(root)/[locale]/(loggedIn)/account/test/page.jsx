"use client"

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';


export default function TestPage() {
    const t = useTranslations('global')

    const { locale } = useRouter()


    return (
        <div>
            {locale}
            {/* This is test page */}
            {t('download')}
        </div>
    )
}
