import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Calendar, Users, Wallet, Star, Package, Sun, Clock,
  ChevronDown, ChevronUp, Loader2, Sparkles, UtensilsCrossed,
  Bed, Lightbulb, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import {
  itineraryRequestSchema,
  TRAVEL_STYLES, GROUP_TYPES, BUDGET_LEVELS, URUGUAY_INTERESTS,
} from "@shared/schema";
import type { GeneratedItinerary, ItineraryDay } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const formSchema = itineraryRequestSchema;
type FormValues = z.infer<typeof formSchema>;

const travelStyleLabels: Record<string, { label: string; emoji: string; description: string }> = {
  adventure: { label: "Adventure", emoji: "🧗", description: "Hiking, outdoor sports, adrenaline" },
  cultural: { label: "Cultural", emoji: "🏛️", description: "History, arts, local traditions" },
  beach: { label: "Beach & Relaxation", emoji: "🏖️", description: "Sunbathing, swimming, coastal vibes" },
  food_wine: { label: "Food & Wine", emoji: "🍷", description: "Gastronomy, wineries, local cuisine" },
  nature: { label: "Nature", emoji: "🦜", description: "Wildlife, parks, ecological reserves" },
  mixed: { label: "Mixed", emoji: "✨", description: "A little bit of everything" },
};

const groupTypeLabels: Record<string, { label: string; emoji: string }> = {
  solo: { label: "Solo", emoji: "🧑" },
  couple: { label: "Couple", emoji: "💑" },
  family: { label: "Family", emoji: "👨‍👩‍👧‍👦" },
  friends: { label: "Group of Friends", emoji: "👥" },
};

const budgetLabels: Record<string, { label: string; emoji: string; description: string }> = {
  budget: { label: "Budget", emoji: "💰", description: "Hostels & street food" },
  moderate: { label: "Moderate", emoji: "💳", description: "Mid-range hotels & local restaurants" },
  luxury: { label: "Luxury", emoji: "💎", description: "Boutique hotels & fine dining" },
};

const activityTypeColors: Record<string, string> = {
  cultural: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  outdoor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  food: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  relaxation: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  sightseeing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  adventure: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  nature: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
};

function DayCard({ day, defaultOpen }: { day: ItineraryDay; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <CardHeader className="py-4 px-5 flex flex-row items-center justify-between hover:bg-muted/40 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              {day.day}
            </div>
            <div>
              <CardTitle className="text-base font-semibold leading-tight">{day.title}</CardTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" /> {day.location}
              </p>
            </div>
          </div>
          {open ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
        </CardHeader>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <CardContent className="px-5 pb-5 pt-0 space-y-5">
              <p className="text-sm text-foreground/80">{day.description}</p>

              {/* Activities */}
              {day.activities.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> Activities
                  </h4>
                  <div className="space-y-2">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <div className="mt-0.5 shrink-0">
                          <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${activityTypeColors[act.type] ?? "bg-muted text-muted-foreground"}`}>
                            {act.duration}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">{act.name}</span>
                          <span className="text-muted-foreground"> — {act.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meals */}
              {day.meals.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                    <UtensilsCrossed className="h-3.5 w-3.5" /> Where to Eat
                  </h4>
                  <div className="space-y-2">
                    {day.meals.map((meal, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <Badge variant="outline" className="text-xs capitalize shrink-0 h-fit mt-0.5">
                          {meal.type}
                        </Badge>
                        <div>
                          <span className="font-medium">{meal.suggestion}</span>
                          <span className="text-muted-foreground"> — {meal.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accommodation */}
              {day.accommodation && (
                <div className="flex items-start gap-2 text-sm">
                  <Bed className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Stay: </span>
                    <span className="text-foreground/80">{day.accommodation}</span>
                  </div>
                </div>
              )}

              {/* Tips */}
              {day.tips.length > 0 && (
                <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
                  <h4 className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1.5 flex items-center gap-1">
                    <Lightbulb className="h-3 w-3" /> Local Tips
                  </h4>
                  <ul className="space-y-1">
                    {day.tips.map((tip, i) => (
                      <li key={i} className="text-xs text-amber-700 dark:text-amber-400">• {tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function ItineraryDisplay({ itinerary, onReset }: { itinerary: GeneratedItinerary; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">{itinerary.title}</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">{itinerary.summary}</p>
        <div className="flex flex-wrap justify-center gap-2 pt-1">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {itinerary.totalDays} days
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sun className="h-3 w-3" /> {itinerary.bestTimeToVisit}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Wallet className="h-3 w-3" /> {itinerary.estimatedBudget}
          </Badge>
        </div>
      </div>

      {/* Highlights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" /> Trip Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid sm:grid-cols-2 gap-2">
            {itinerary.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Day by day */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Day-by-Day Itinerary</h3>
        <div className="space-y-3">
          {itinerary.days.map((day, i) => (
            <DayCard key={day.day} day={day} defaultOpen={i === 0} />
          ))}
        </div>
      </div>

      {/* Packing Tips */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="h-4 w-4" /> Packing Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid sm:grid-cols-2 gap-2">
            {itinerary.packingTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-2">
        <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" /> Generate Another Itinerary
        </Button>
      </div>
    </motion.div>
  );
}

export default function UruguayItinerary() {
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: 7,
      travelStyle: "mixed",
      groupType: "couple",
      budget: "moderate",
      interests: ["Beaches", "Wine Tasting"],
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await apiRequest("POST", "/api/itinerary/generate", values);
      const data = await res.json();
      return data.itinerary as GeneratedItinerary;
    },
    onSuccess: (data) => {
      setItinerary(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  function onSubmit(values: FormValues) {
    generateMutation.mutate(values);
  }

  return (
    <div className="font-sans bg-background text-foreground min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Page title */}
          <div className="text-center mb-10 pt-6">
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 rounded-full px-3 py-1 mb-4">
                <MapPin className="h-3.5 w-3.5" /> Uruguay Travel Planner
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Plan Your Perfect Uruguay Trip
              </h1>
              <p className="text-foreground/60 max-w-xl mx-auto">
                Tell us your travel style and we'll craft a personalized itinerary — from Montevideo's
                Old City to the golden shores of Punta del Este and beyond.
              </p>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {itinerary ? (
              <motion.div key="itinerary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ItineraryDisplay itinerary={itinerary} onReset={() => setItinerary(null)} />
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Duration */}
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> How long is your trip?
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(v) => field.onChange(parseInt(v))}
                              value={String(field.value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 20 }, (_, i) => i + 2).map((n) => (
                                  <SelectItem key={n} value={String(n)}>
                                    {n} {n === 1 ? "day" : "days"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Travel Style */}
                    <FormField
                      control={form.control}
                      name="travelStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <Sparkles className="h-4 w-4" /> What's your travel style?
                          </FormLabel>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
                            {TRAVEL_STYLES.map((style) => {
                              const meta = travelStyleLabels[style];
                              const selected = field.value === style;
                              return (
                                <button
                                  key={style}
                                  type="button"
                                  onClick={() => field.onChange(style)}
                                  className={`rounded-lg border p-3 text-left transition-all ${
                                    selected
                                      ? "border-primary bg-primary/10 ring-1 ring-primary"
                                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                                  }`}
                                >
                                  <div className="text-xl mb-1">{meta.emoji}</div>
                                  <div className="text-sm font-medium">{meta.label}</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">{meta.description}</div>
                                </button>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Group Type */}
                    <FormField
                      control={form.control}
                      name="groupType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <Users className="h-4 w-4" /> Who's traveling?
                          </FormLabel>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
                            {GROUP_TYPES.map((gt) => {
                              const meta = groupTypeLabels[gt];
                              const selected = field.value === gt;
                              return (
                                <button
                                  key={gt}
                                  type="button"
                                  onClick={() => field.onChange(gt)}
                                  className={`rounded-lg border p-3 text-center transition-all ${
                                    selected
                                      ? "border-primary bg-primary/10 ring-1 ring-primary"
                                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                                  }`}
                                >
                                  <div className="text-2xl mb-1">{meta.emoji}</div>
                                  <div className="text-sm font-medium">{meta.label}</div>
                                </button>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Budget */}
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <Wallet className="h-4 w-4" /> Budget level?
                          </FormLabel>
                          <div className="grid grid-cols-3 gap-3 mt-1">
                            {BUDGET_LEVELS.map((b) => {
                              const meta = budgetLabels[b];
                              const selected = field.value === b;
                              return (
                                <button
                                  key={b}
                                  type="button"
                                  onClick={() => field.onChange(b)}
                                  className={`rounded-lg border p-3 text-center transition-all ${
                                    selected
                                      ? "border-primary bg-primary/10 ring-1 ring-primary"
                                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                                  }`}
                                >
                                  <div className="text-xl mb-1">{meta.emoji}</div>
                                  <div className="text-sm font-medium">{meta.label}</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">{meta.description}</div>
                                </button>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Interests */}
                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <Star className="h-4 w-4" /> What interests you? <span className="text-sm font-normal text-muted-foreground">(pick at least 1)</span>
                          </FormLabel>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                            {URUGUAY_INTERESTS.map((interest) => {
                              const checked = field.value.includes(interest);
                              return (
                                <Label
                                  key={interest}
                                  className={`flex items-center gap-2 rounded-lg border p-2.5 cursor-pointer transition-all ${
                                    checked
                                      ? "border-primary bg-primary/10"
                                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                                  }`}
                                >
                                  <Checkbox
                                    checked={checked}
                                    onCheckedChange={(val) => {
                                      if (val) {
                                        field.onChange([...field.value, interest]);
                                      } else {
                                        field.onChange(field.value.filter((i) => i !== interest));
                                      }
                                    }}
                                  />
                                  <span className="text-sm">{interest}</span>
                                </Label>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      disabled={generateMutation.isPending}
                      className="w-full text-base font-semibold py-6"
                    >
                      {generateMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Crafting your Uruguay adventure…
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate My Itinerary
                        </>
                      )}
                    </Button>

                    {generateMutation.isError && (
                      <p className="text-sm text-destructive text-center">
                        {generateMutation.error?.message || "Something went wrong. Please try again."}
                      </p>
                    )}
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
