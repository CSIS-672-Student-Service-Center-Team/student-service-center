import Image from 'next/image'
import Link from 'next/link'

export function LogoComponent({ className = '', size = 50 }: { className?: string, size?: number }) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <Image
        src="/student-service-center-logo.png"
        alt="Student Service Center Logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </Link>
  )
}