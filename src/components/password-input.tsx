import { ComponentProps, useState } from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const PasswordInput = ({ className, ...props }: ComponentProps<"input">) => {
    const [showPassword, setShowPassword] = useState(false);

    const type = showPassword ? 'text' : 'password';
    const Icon = showPassword ? EyeOffIcon : EyeIcon;

    function handleToggle() {
        setShowPassword((prev) => !prev);
    }

    return (
        <div className="relative">
            <Input type={type} className={cn("pe-9", className)} {...props} />
            <button type="button" onClick={handleToggle} className="absolute top-1/2 -translate-y-1/2 cursor-pointer right-2">
                <Icon className="stroke-muted-foreground size-5 mr-1" />
            </button>
        </div>
    );
};
