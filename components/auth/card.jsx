"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import Social from "@/components/auth/social";
import { BackBtn } from "@/components/auth/back-btn";

export const CardWarp = ({
  children,
  header,
  backhref,
  backlabel,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-black/20 bg-card text-card-foreground">
      <CardHeader>
        <Header label={header} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <>
          <div className="flex items-center justify-center">
            <div className="w-[100px] h-[1px] bg-card-foreground/20"></div>
            <div className="text-card-foreground">OR</div>
            <div className="w-[100px] h-[1px] bg-card-foreground/20"></div>
          </div>
          <CardFooter>
            <Social />
          </CardFooter>
        </>
      )}
      <CardFooter>
        <BackBtn className="text-muted-foreground" backhref={backhref} backlabel={backlabel} />
      </CardFooter>
    </Card>
  );
};
