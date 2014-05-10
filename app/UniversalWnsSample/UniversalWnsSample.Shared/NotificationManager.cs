using System;
using System.Threading.Tasks;
using Windows.Networking.PushNotifications;
using Windows.Web.Http;
using UniversalWnsSample.Extensions;

namespace UniversalWnsSample
{
    public static class NotificationManager
    {
        private const string RegisterUri = "https://wns.azure-mobile.net/api/register";
        private const string UnregisterUri = "https://wns.azure-mobile.net/api/unregister";

        private static async Task<bool> SendRequestAsync(string uri, string friendly)
        {
            var channel = await PushNotificationChannelManager.CreatePushNotificationChannelForApplicationAsync();
            var client = new HttpClient();
            try
            {
                using (var response = await client.PostAsync(new Uri(uri), new { uri = channel.Uri, friendly = friendly }))
                {
                    return response.StatusCode == HttpStatusCode.Ok;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static Task<bool> RegisterAsync(string s)
        {
            return SendRequestAsync(RegisterUri, s);
        }

        public static Task<bool> UnregisterAsync()
        {
            return SendRequestAsync(UnregisterUri, "");
        }
    }
}
