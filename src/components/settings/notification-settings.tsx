'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/lib/utils/toast';

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [marketUpdates, setMarketUpdates] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [schemeAlerts, setSchemeAlerts] = useState(true);
  const [communityMessages, setCommunityMessages] = useState(false);
  const { toast } = useToast();

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved successfully');
    
    // In a real implementation, this would update the user's notification preferences in the database
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Channels</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
              <span>SMS Notifications</span>
              <span className="text-xs text-muted-foreground">Receive notifications via SMS</span>
            </Label>
            <Switch
              id="sms-notifications"
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="text-xs text-muted-foreground">Receive notifications via email</span>
            </Label>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="text-xs text-muted-foreground">Receive notifications on your device</span>
            </Label>
            <Switch
              id="push-notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Types</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="market-updates" className="flex flex-col space-y-1">
              <span>Market Updates</span>
              <span className="text-xs text-muted-foreground">Price changes and new products</span>
            </Label>
            <Switch
              id="market-updates"
              checked={marketUpdates}
              onCheckedChange={setMarketUpdates}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="weather-alerts" className="flex flex-col space-y-1">
              <span>Weather Alerts</span>
              <span className="text-xs text-muted-foreground">Severe weather warnings and forecasts</span>
            </Label>
            <Switch
              id="weather-alerts"
              checked={weatherAlerts}
              onCheckedChange={setWeatherAlerts}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="scheme-alerts" className="flex flex-col space-y-1">
              <span>Scheme Alerts</span>
              <span className="text-xs text-muted-foreground">New government schemes and deadlines</span>
            </Label>
            <Switch
              id="scheme-alerts"
              checked={schemeAlerts}
              onCheckedChange={setSchemeAlerts}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="community-messages" className="flex flex-col space-y-1">
              <span>Community Messages</span>
              <span className="text-xs text-muted-foreground">Messages from other farmers and experts</span>
            </Label>
            <Switch
              id="community-messages"
              checked={communityMessages}
              onCheckedChange={setCommunityMessages}
            />
          </div>
        </div>
      </div>
      
      <Button onClick={handleSaveNotifications}>Save Notification Preferences</Button>
    </div>
  );
}
