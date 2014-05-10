using System;
using System.Linq;
using System.Reflection;
using Windows.Foundation;
using Windows.Web.Http;

namespace UniversalWnsSample.Extensions
{
    public static class HttpClientExtension
    {
        public static IAsyncOperationWithProgress<HttpResponseMessage, HttpProgress> PostAsync(this HttpClient client,
            Uri uri, object param)
        {
            var type = param.GetType();
            var props = type.GetRuntimeProperties();
            var dictionary = props.ToDictionary(p => p.Name, p => p.GetValue(param).ToString());
            var content = new HttpFormUrlEncodedContent(dictionary);
            return client.PostAsync(uri, content);
        }
    }
}
