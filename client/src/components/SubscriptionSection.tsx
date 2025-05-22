import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import RevealOnScroll from "./RevealOnScroll";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { FormField, FormItem, FormLabel, FormMessage, FormControl, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { waitlistSchema } from "@/lib/schemas";
import { useState } from "react";

export default function SubscriptionSection() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (values: z.infer<typeof waitlistSchema>) => {
      const response = await apiRequest("POST", "/api/waitlist", values);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "You've been added to our waitlist.",
      });
      // Reset form
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong.",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof waitlistSchema>) {
    waitlistMutation.mutate(values);
  }

  return (
    <section id="subscribe" className="py-16 bg-secondary/50 dark:bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <RevealOnScroll>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Join Our Waitlist</h2>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <p className="text-foreground/80 mb-6">
                Be the first to know when we launch our AI solutions for the insurance industry.
              </p>
            </RevealOnScroll>
          </div>
          
          <RevealOnScroll delay={0.2}>
            <Card className="bg-card border-border rounded-lg shadow-sm p-6">
              {!isSubmitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              className="w-full rounded-md border-input" 
                              placeholder="Enter your name" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">Company</FormLabel>
                          <FormControl>
                            <Input 
                              className="w-full rounded-md border-input" 
                              placeholder="Enter your company name" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              className="w-full rounded-md border-input" 
                              placeholder="Enter your email address" 
                              type="email"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        disabled={waitlistMutation.isPending}
                        className="w-full text-primary-foreground font-medium rounded-md px-4 py-2 text-center transition-all"
                      >
                        {waitlistMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Join Waitlist"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="text-center py-6">
                  <div className="text-accent mb-4">
                    <CheckCircle className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">Thank You!</h3>
                  <p className="text-foreground/80">
                    You've been added to our waitlist. We'll notify you when we launch.
                  </p>
                </div>
              )}
            </Card>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
