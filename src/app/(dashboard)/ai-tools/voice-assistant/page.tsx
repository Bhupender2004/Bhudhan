'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Square, Bot, Volume2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function VoiceAssistantPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hello! I am your BhuDhan AI farming assistant. How can I help you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample conversation history for demo purposes
  const sampleConversations = [
    {
      title: 'Wheat Cultivation',
      messages: [
        { role: 'user' as const, content: 'When is the best time to sow wheat in North India?' },
        { role: 'assistant' as const, content: `For wheat cultivation in North India, the optimal sowing window is from late October to mid-November. This timing allows the crop to establish before winter and mature before the heat of summer arrives.

Specific recommendations for your region in Haryana:
• Irrigated conditions: October 25 to November 15
• Rainfed conditions: October 15 to November 5
• Late sown conditions: Up to December 15 (with 25% higher seed rate)

Varieties like HD-3226, DBW-187, and PBW-752 are performing well in your area. For best results, treat seeds with fungicides before sowing and ensure proper soil moisture at the time of sowing.` },
        { role: 'user' as const, content: 'What fertilizer should I use for wheat?' },
        { role: 'assistant' as const, content: `Based on soil conditions in your region, I recommend the following fertilizer schedule for wheat:

• Basal application (at sowing):
  - 60 kg Nitrogen (N)
  - 60 kg Phosphorus (P₂O₅)
  - 40 kg Potassium (K₂O) per hectare

• Top dressing:
  - First dose: 30 kg N at 21-25 days (crown root initiation stage)
  - Second dose: 30 kg N at 45-50 days (tillering stage)

Micronutrients:
• Apply 25 kg zinc sulfate per hectare as your area shows zinc deficiency
• If leaves show yellowing between veins, consider foliar spray of 0.5% ferrous sulfate

For best results, get your soil tested at the nearest KVK center for more precise recommendations.` }
      ]
    },
    {
      title: 'Pest Management',
      messages: [
        { role: 'user' as const, content: 'How do I control aphids in my vegetable garden?' },
        { role: 'assistant' as const, content: `For aphid control in your vegetable garden, I recommend an Integrated Pest Management (IPM) approach:

Monitoring:
• Check the undersides of leaves regularly, especially new growth
• Look for clusters of small green, black, or white soft-bodied insects
• Watch for sticky honeydew or sooty mold as indicators

Prevention:
• Encourage beneficial insects (ladybugs, lacewings, parasitic wasps)
• Plant companion plants like marigold, nasturtium, and garlic
• Use reflective mulch or aluminum foil to repel aphids

Control methods (in order of increasing intervention):
1. Strong water spray to dislodge aphids
2. Neem oil solution (5ml per liter of water with a drop of dish soap)
3. Insecticidal soap spray (follow package directions)
4. Pyrethrin-based organic insecticides for severe infestations

Apply treatments in the evening to reduce impact on beneficial insects. Repeat every 5-7 days until the infestation is controlled.` },
        { role: 'user' as const, content: 'What about pests in my rice crop?' },
        { role: 'assistant' as const, content: `For rice cultivation in your region, current pest alerts include:

• Brown planthopper (BPH):
  - Current risk: Moderate to high with prevailing temperatures
  - Identification: Check for hoppers at the base of plants and yellowing patches (hopper burn)
  - Control: Drain fields temporarily, avoid excessive nitrogen, apply buprofezin or pymetrozine if threshold exceeded (10-15 hoppers per hill)

• Stem borer:
  - Current risk: Moderate
  - Identification: Dead hearts in vegetative stage, white heads in reproductive stage
  - Control: Release Trichogramma egg parasitoids, apply cartap hydrochloride if damage exceeds 5%

• Blast disease:
  - Risk increases with current fluctuating temperatures
  - Identification: Diamond-shaped lesions on leaves, infected panicles
  - Control: Maintain proper water levels, apply triazole fungicides at first signs

Preventive measures:
• Install yellow sticky traps and pheromone traps for monitoring
• Maintain optimal water levels (5cm) to discourage certain pests
• Balanced fertilization to avoid excessive vegetative growth
• Encourage natural enemies by avoiding unnecessary pesticide applications` }
      ]
    },
    {
      title: 'Weather & Irrigation',
      messages: [
        { role: 'user' as const, content: 'What is the weather forecast for Haryana this week?' },
        { role: 'assistant' as const, content: `Based on the latest meteorological data for your region in Haryana, the forecast shows:

• Today: Clear skies with temperatures between 26-32°C, humidity around 45%
• Tomorrow: Partly cloudy with a slight chance (20%) of light showers in the evening, temperatures between 25-30°C
• Next 3 days: Temperatures will gradually rise to 34°C with dry conditions
• Weekend: Possibility of dust storms with wind speeds increasing to 20-25 km/h

Farming implications:
• Current conditions are favorable for harvesting operations
• The light showers expected tomorrow are unlikely to affect field activities significantly
• Plan any pesticide applications for today or after 48 hours
• Ensure irrigation for vegetable crops as temperatures rise later this week
• Consider covering nurseries if dust storms materialize over the weekend` },
        { role: 'user' as const, content: 'When should I irrigate my wheat crop?' },
        { role: 'assistant' as const, content: `For wheat irrigation in your region, follow this schedule based on critical growth stages:

1. Crown Root Initiation (CRI): 20-25 days after sowing
2. Tillering: 40-45 days after sowing
3. Jointing/Late Tillering: 60-65 days after sowing
4. Flowering: 80-85 days after sowing
5. Milk stage: 100-105 days after sowing
6. Dough stage: If needed, based on soil moisture

Current recommendations:
• Based on your sowing date and current crop stage (tillering), irrigation is recommended within the next 3-5 days
• Morning irrigation (6-10 AM) is most efficient to reduce evaporation losses
• Apply 5-6 cm water depth per irrigation
• Critical stages are CRI and flowering - never skip these irrigations

Soil moisture monitoring:
• Field capacity is currently at 65% - irrigation would be beneficial soon
• Check soil by pressing a handful - if it forms a ball that breaks easily, it's time to irrigate` }
      ]
    },
    {
      title: 'Market Prices',
      messages: [
        { role: 'user' as const, content: 'What are the current prices for wheat and rice?' },
        { role: 'assistant' as const, content: `Current agricultural market prices in your region:

Wheat:
• MSP: ₹2,125 per quintal
• Mandi rates: ₹2,125-2,200 per quintal
• Premium varieties (high protein): ₹2,250-2,350 per quintal

Rice:
• Common paddy MSP: ₹2,040 per quintal
• Mandi rates for common varieties: ₹2,040-2,100 per quintal
• Basmati varieties: ₹3,800-4,200 per quintal (15% higher than last season)

Nearest active markets:
• Rewari Grain Market: 12 km from your location
• Bawal Agricultural Market: 28 km from your location

Market trends:
• Wheat prices expected to remain stable for next 2-3 weeks
• Basmati prices showing upward trend due to export demand
• Best time to sell: Current prices are favorable compared to seasonal averages

Government procurement:
• Wheat procurement at MSP ongoing at designated centers
• Registration required through local agriculture office` },
        { role: 'user' as const, content: 'Are there any subsidies available for drip irrigation?' },
        { role: 'assistant' as const, content: `Yes, several subsidies are available for drip irrigation in your region:

1. Pradhan Mantri Krishi Sinchayee Yojana (PMKSY):
   • Small & marginal farmers: 55% subsidy
   • Other farmers: 45% subsidy
   • Maximum area covered: 5 hectares per beneficiary

2. Haryana Micro Irrigation Scheme:
   • Additional 15% top-up subsidy from state government
   • Total subsidy can reach up to 70% for small farmers

3. NABARD Financing:
   • Low-interest loans for remaining amount after subsidy
   • Repayment period of 5-7 years with 6-month moratorium

Application process:
• Apply through your District Horticulture Office or Agriculture Department
• Documents required: Land records, bank account details, Aadhaar, farmer registration
• Online application available at https://pmksy.gov.in

Approved vendors in your area:
• Jain Irrigation Systems
• Netafim India
• Harvel Irrigation

The current waiting period for subsidy approval is approximately 30-45 days.` }
      ]
    }
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop voice recording
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would start/stop audio playback
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages([...messages, { role: 'user', content: inputText }]);
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      // Advanced pattern matching for more natural responses
      const lowerInput = inputText.toLowerCase();
      
      // Weather related queries
      if (lowerInput.includes('weather')) {
        if (lowerInput.includes('forecast') || lowerInput.includes('predict') || lowerInput.includes('next') || lowerInput.includes('tomorrow')) {
          response = `Based on the latest meteorological data for your region in Haryana, the forecast shows:

• Today: Clear skies with temperatures between 26-32°C, humidity around 45%

• Tomorrow: Partly cloudy with a slight chance (20%) of light showers in the evening, temperatures between 25-30°C

• Next 3 days: Temperatures will gradually rise to 34°C with dry conditions suitable for field operations.`;
        } else if (lowerInput.includes('rain') || lowerInput.includes('rainfall')) {
          response = `The current rainfall prediction for your area shows a 20% chance of light showers tomorrow evening. The monthly rainfall so far is 45mm, which is about 15% below the seasonal average. I recommend planning any water-sensitive field operations for today while conditions remain dry.`;
        } else {
          response = `The current weather in your region shows clear skies with temperatures around 28°C and humidity at 45%. Wind speed is low at 5-10 km/h from the southwest. These conditions are favorable for most field activities including spraying and harvesting.`;
        }
      } 
      
      // Pest management queries
      else if (lowerInput.includes('pest') || lowerInput.includes('insect') || lowerInput.includes('disease')) {
        if (lowerInput.includes('wheat') || lowerInput.includes('gehun')) {
          response = `For wheat crops in your region, the main concerns this season are:

• Aphids: Currently at moderate risk levels. Look for clusters on new growth and honeydew secretion. Use neem-based sprays for early infestations.

• Leaf rust: Risk is increasing with current humidity levels. Monitor for orange-brown pustules on leaves. Early application of propiconazole can be effective.

• Powdery mildew: Low risk currently, but watch for white powdery patches if humidity increases.

I recommend weekly scouting of your fields, focusing on field edges and areas with previous infestations.`;
        } else if (lowerInput.includes('rice') || lowerInput.includes('paddy') || lowerInput.includes('chawal')) {
          response = `For rice cultivation in your region, current pest alerts include:

• Brown planthopper: Moderate to high risk with current temperatures. Check for hoppers at the base of plants and yellowing patches.

• Stem borer: Early signs include dead hearts. Current risk is moderate.

• Blast disease: Risk increases with fluctuating temperatures. Look for diamond-shaped lesions on leaves.

Consider installing yellow sticky traps for monitoring and maintain optimal water levels to discourage certain pests.`;
        } else {
          response = `Based on current conditions in your region, pest pressure is moderate. I recommend implementing Integrated Pest Management (IPM) approaches including:

• Regular monitoring using traps and visual inspection

• Encouraging beneficial insects by maintaining diversity in field margins

• Targeted use of biopesticides for early interventions

• Cultural practices like crop rotation and timely planting

• Chemical controls only when thresholds are exceeded

Would you like specific recommendations for a particular crop?`;
        }
      } 
      
      // Fertilizer and soil nutrition queries
      else if (lowerInput.includes('fertilizer') || lowerInput.includes('nutrient') || lowerInput.includes('soil health')) {
        if (lowerInput.includes('wheat') || lowerInput.includes('gehun')) {
          response = `For wheat cultivation in your region, I recommend:

• Basal application: 60 kg N, 60 kg P2O5, and 40 kg K2O per hectare at sowing

• Top dressing: Additional 60 kg N in two splits - first at crown root initiation (21-25 days) and second at tillering (45-50 days)

• Micronutrients: Zinc deficiency is common in your area - apply 25 kg zinc sulfate per hectare

• Consider soil test results for more precise recommendations. Current soil data for your region suggests watching for zinc and sulfur deficiencies.`;
        } else if (lowerInput.includes('organic') || lowerInput.includes('natural') || lowerInput.includes('sustainable')) {
          response = `For organic nutrient management, consider these approaches:

• Compost application: 10-15 tonnes/hectare of well-decomposed compost before planting

• Green manuring: Grow legumes like moong or cowpea and incorporate before flowering

• Vermicompost: 5 tonnes/hectare provides balanced nutrition and improves soil biology

• Biofertilizers: Azotobacter for non-legumes, Rhizobium for legumes, and PSB for phosphorus solubilization

• Liquid formulations: Jeevamrut or Panchagavya as foliar sprays during vegetative growth

These methods build long-term soil health while providing balanced nutrition.`;
        } else {
          response = `Based on typical soil conditions in your region, I recommend:

• Conduct a soil test for precise recommendations - this is the most important first step

• For most crops, a balanced NPK application (12-32-16 or similar) would be suitable as a starting point

• Split nitrogen applications to improve efficiency and reduce losses

• Include secondary nutrients (S, Ca, Mg) and micronutrients based on soil test results

• Consider soil pH - current data shows your region has slightly alkaline soils (pH 7.5-8.2) which may affect nutrient availability

• Incorporate organic matter to improve nutrient retention and soil structure`;
        }
      } 
      
      // Water and irrigation queries
      else if (lowerInput.includes('water') || lowerInput.includes('irrigation')) {
        if (lowerInput.includes('drip') || lowerInput.includes('micro')) {
          response = `Drip irrigation is an excellent choice for your region. Benefits include:

• Water savings of 30-60% compared to flood irrigation

• Reduced weed growth between rows

• Ability to apply fertilizers directly to the root zone (fertigation)

• Lower disease pressure due to dry foliage

• Government subsidies available under the PMKSY scheme (up to 55% for small farmers)

For installation, I recommend consulting with suppliers like Netafim, Jain Irrigation, or local KVK centers for guidance specific to your crops and field conditions.`;
        } else if (lowerInput.includes('schedule') || lowerInput.includes('timing') || lowerInput.includes('when')) {
          response = `For optimal irrigation scheduling in your region:

• Early morning irrigation (4-8 AM) is most efficient to reduce evaporation losses

• For wheat at current growth stage: Irrigate at crown root initiation, tillering, jointing, flowering, and grain filling stages

• Critical moisture-sensitive periods require special attention - flowering and grain development stages

• Current soil moisture sensors indicate levels at 65% of field capacity - irrigation would be beneficial within the next 2-3 days

• Adjust frequency based on temperature - current conditions suggest a 7-10 day interval for most crops`;
        } else {
          response = `For efficient water management in your region, I recommend:

• Adopt water-efficient methods like drip or sprinkler irrigation where suitable

• Implement irrigation scheduling based on crop water requirements and soil moisture status

• Consider deficit irrigation strategies during less sensitive growth stages

• Use mulching to reduce evaporation losses (organic mulch or plastic mulch)

• Maintain irrigation infrastructure to prevent water losses through leakage

• Harvest rainwater where possible to supplement irrigation needs

• Current groundwater levels in your region are declining - conservation is increasingly important`;
        }
      }
      
      // Crop-specific advice
      else if (lowerInput.includes('wheat') || lowerInput.includes('gehun')) {
        response = `For wheat cultivation in your region:

• Current optimal varieties: HD-3226, DBW-187, and PBW-752 show good performance

• Sowing time: Late October to mid-November is ideal

• Seed rate: 100 kg/ha for timely sowing, 125 kg/ha for late sowing

• Spacing: 20-22.5 cm between rows

• Major concerns: Yellow rust is showing increased incidence this season - monitor closely

• Current market price: ₹2,125 per quintal at local mandis

• Weather outlook is favorable for wheat development in the coming weeks`;
      }
      else if (lowerInput.includes('rice') || lowerInput.includes('paddy') || lowerInput.includes('chawal')) {
        response = `For rice cultivation in your region:

• Recommended varieties: Pusa Basmati-1509, PR-126, and HKR-47 are performing well

• Transplanting: Complete by mid-July for optimal yields

• Water management: Practice alternate wetting and drying to save water and reduce methane emissions

• Current challenges: Bacterial leaf blight pressure is moderate - maintain field hygiene

• Market outlook: Basmati prices are trending 15% higher than last season

• Post-harvest: Ensure proper drying to 14% moisture content for storage`;
      }
      
      // Market and prices
      else if (lowerInput.includes('price') || lowerInput.includes('market') || lowerInput.includes('sell') || lowerInput.includes('mandi')) {
        response = `Current market prices in your region:

• Wheat: ₹2,125-2,200 per quintal (MSP: ₹2,125)

• Paddy: ₹2,040-2,100 per quintal (MSP: ₹2,040)

• Mustard: ₹5,450-5,650 per quintal (MSP: ₹5,450)

• Cotton: ₹6,620-7,000 per quintal (MSP: ₹6,620)

• Nearest active mandis: Rewari Grain Market, Bawal Agricultural Market

• Market trend: Prices expected to remain stable for the next 2-3 weeks based on current demand and supply patterns`;
      }
      
      // Government schemes
      else if (lowerInput.includes('scheme') || lowerInput.includes('subsidy') || lowerInput.includes('government') || lowerInput.includes('yojana')) {
        response = `Current agricultural schemes available in your region:

• PM-KISAN: ₹6,000 annual direct benefit transfer - next installment due in April

• Soil Health Card: Free soil testing available at nearest KVK center

• PMFBY: Crop insurance scheme - last date for Kharif enrollment is July 15th

• PMKSY: Subsidies for micro-irrigation (up to 55% for small farmers)

• RKVY: Assistance for farm machinery and infrastructure

• E-NAM: Online trading platform connecting to larger markets

• For application assistance, visit your local Agriculture Department office or call the Kisan Call Center at 1800-180-1551`;
      }
      
      // Fallback for other queries
      else {
        response = `Thank you for your question about ${inputText}. As your BhuDhan AI farming assistant, I can provide information on:

• Weather forecasts and alerts

• Crop-specific cultivation practices

• Pest and disease management

• Soil health and fertilizer recommendations

• Irrigation management

• Market prices and trends

• Government schemes and subsidies

Please feel free to ask about any of these topics, or specify your crop and region for more tailored advice.`;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
    
    setInputText('');
  };

  const loadConversation = (index: number) => {
    setMessages([
      { role: 'assistant', content: 'Hello! I am your BhuDhan AI farming assistant. How can I help you today?' },
      ...sampleConversations[index].messages
    ]);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/ai-tools">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Voice Assistant</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>BhuDhan AI Assistant</CardTitle>
                </div>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="punjabi">Punjabi</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                Ask questions about farming, weather, crops, and more
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-y-auto pb-0">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            
            <CardFooter className="pt-4">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Button 
                  type="button"
                  variant="outline" 
                  size="icon" 
                  onClick={toggleRecording}
                  className={isRecording ? 'bg-red-100 text-red-500' : ''}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your question here..."
                  className="flex-grow rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
                <Button type="submit">Send</Button>
              </form>
            </CardFooter>
          </Card>
          
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={togglePlayback}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? 'Stop' : 'Play'} Audio</span>
            </Button>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="75" 
                className="w-24"
              />
            </div>
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>
                Continue a previous conversation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="history">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>
                <TabsContent value="history" className="space-y-4 pt-4">
                  {sampleConversations.map((convo, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => loadConversation(index)}
                    >
                      <div>
                        <p className="font-medium">{convo.title}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                          {convo.messages[0].content}
                        </p>
                      </div>
                    </Button>
                  ))}
                </TabsContent>
                <TabsContent value="suggestions" className="space-y-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => setInputText("What crops are suitable for sandy soil?")}
                  >
                    What crops are suitable for sandy soil?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => setInputText("How can I improve soil fertility naturally?")}
                  >
                    How can I improve soil fertility naturally?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => setInputText("What is the weather forecast for this week?")}
                  >
                    What is the weather forecast for this week?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => setInputText("How do I control tomato leaf curl virus?")}
                  >
                    How do I control tomato leaf curl virus?
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
