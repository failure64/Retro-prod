'use cient';

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}
const Headings: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
  return (
    <div className={center? 'text-center' : 'text-start'}>
        <div className="font-bold text-2xl">
            {title}
        </div>
        <div className="font-loght text-neutral-500 mt-2">
            {subtitle}
        </div>
    </div>
  )
}

export default Headings