using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace UniversalWnsSample
{
    /// <summary>
    /// Frame 内へナビゲートするために利用する空欄ページ。
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }

        private async void RegisterClick(object sender, RoutedEventArgs e)
        {
            await NotificationManager.RegisterAsync(FriendlyName.Text ?? "");
        }

        private async void UnregisterClick(object sender, RoutedEventArgs e)
        {
            await NotificationManager.UnregisterAsync();
        }
    }
}
