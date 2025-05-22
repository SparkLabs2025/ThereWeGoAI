import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
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
    <section id="subscribe" className="py-20 bg-white dark:bg-dark/90">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Waitlist</h2>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <p className="text-lg text-dark/80 dark:text-white/80 leading-relaxed">
                Be the first to know when we launch. Subscribe to our waitlist for exclusive updates on our AI solutions for the insurance industry.
              </p>
            </RevealOnScroll>
          </div>
          
          <RevealOnScroll delay={0.3}>
            <Card className="bg-white dark:bg-dark/80 rounded-xl shadow-lg p-8 md:p-10">
              {!isSubmitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium text-dark dark:text-white/80 mb-1">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
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
                            <FormLabel className="block text-sm font-medium text-dark dark:text-white/80 mb-1">Company</FormLabel>
                            <FormControl>
                              <Input 
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                                placeholder="Enter your company name" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium text-dark dark:text-white/80 mb-1">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
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
                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-5 py-4 text-center transition-all flex items-center justify-center"
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
                <div className="text-center py-8">
                  <div className="text-5xl text-[#10B981] mb-4">
                    <CheckCircle className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-dark/70 dark:text-white/70">
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
