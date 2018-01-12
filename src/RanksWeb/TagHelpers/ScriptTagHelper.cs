namespace WiseWeb.TagHelpers
{
    using Microsoft.AspNetCore.Razor.TagHelpers;
    using System.Threading.Tasks;

    [HtmlTargetElement("script", Attributes = "versioned")]
    public class ScriptTagHelper : TagHelper
    {
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "script";
            if (context.AllAttributes.TryGetAttribute("src", out var src))
            {
                output.Attributes.SetAttribute("src", $"{src.Value}?v={this.GetType().Assembly.GetName().Version}");
            }
        }
    }
}