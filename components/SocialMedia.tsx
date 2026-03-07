import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const socialLink = [
  {
    title: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
  },
  {
    title: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
  {
    title: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
  },
  {
    title: "Linkedin",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    title: "Youtube",
    href: "https://youtube.com",
    icon: Youtube,
  },
];
interface Props {
    className? : string,
    IconClassName?: string,
    tooltipClassName?:string
}

const SocialMedia = ({className,IconClassName,tooltipClassName} : Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5",className)}>
        {socialLink?.map((item) => {
          const Icon = item.icon;
          return (
            <Tooltip key={item?.title}>
              <TooltipTrigger asChild>
                <Link href={item.href} target="_blank" rel="noopener noreferrer" className={cn("border p-2  rounded-full hover:text-white hover:border-shop_light_green hoverEffect",IconClassName)}><Icon/></Link>
              </TooltipTrigger>
              <TooltipContent className={cn("bg-white text-darkColor font-semibold",tooltipClassName)}>{item.title}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
