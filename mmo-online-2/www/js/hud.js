/**
 * Created by Kevin on 13/02/2015.
 */
var HUD = {
    flashFadeTime:500,
    circleHighlightTime:500,
    borderColor:0x000000,
};

HUD.borderSize = function(w,h) {
    var x = Math.min(w,h);
    x = Math.ceil(x/10);
    return x;
};

HUD.highlightColor = function(color) {
    var x = 0.75;
    var c = HUD.getRGB(color);

    c[0] += Math.round((255-c[0])*x);
    c[1] += Math.round((255-c[1])*x);
    c[2] += Math.round((255-c[2])*x);

    return HUD.fromRGB(c);
};

//from c1 to c2
HUD.interpolateColor = function(color1, color2, progress) {
    var c1 = HUD.getRGB(color1);
    var c2 = HUD.getRGB(color2);
    var c = [
        Math.round(c1[0] + (c2[0] - c1[0]) * progress),
        Math.round(c1[1] + (c2[1] - c1[1]) * progress),
        Math.round(c1[2] + (c2[2] - c1[2]) * progress)
    ];

    return HUD.fromRGB(c);
};

HUD.getRGB = function(color) {
    return [
        (color & 0xff0000) >> 16,
        (color & 0x00ff00) >> 8,
        color & 0x0000ff
    ];
};

HUD.fromRGB = function(rgb) {
    return (rgb[0] << 16) + (rgb[1] << 8) + rgb[2];
};

HUD.Bar = function(w, h, color, val, maxVal) {
    this.w = Math.max(w,3);
    this.h = Math.max(h,3);
    this.color = color;
    this.flashColor = HUD.highlightColor(color);
    this.val = val;
    this.maxVal = maxVal;

    this.tex = new PIXI.RenderTexture(w,h);
    this.sprite = new PIXI.Sprite(this.tex);
    this.flashes = [];
    this.redraw = true;

    this.draw = function(graphics) {
        if (this.redraw) {
            this.redraw = false;
        } else {
            return;
        }
        var b = HUD.borderSize(this.w, this.h);
        var w = this.w-b*2;
        var h = this.h-b*2;

        graphics.clear();

        //background
        graphics.beginFill(HUD.borderColor);
        graphics.drawRect(0,0,this.w,this.h);
        graphics.endFill();

        //fill
        var fillW = Math.round((this.val / this.maxVal) * w);

        //flashes


        graphics.beginFill(this.color);
        graphics.drawRect(b,b,fillW,h);
        graphics.endFill();

        this.tex.render(graphics);
    };

    this.changeVal = function(val, noflash) {
        var _this = this;
        if (!noflash && val < this.val) {
            var flash = {
                time:new Date().getTime(),
                prevVal:_this.val,
                newVal:val
            };
            this.flashes.push(flash);
        }
        this.val = val;
        this.redraw = true;
    };
};

HUD.Circle = function(w, h, color, borderWidth) {
    this.w = w*2;
    this.h = h*2;
    this.color = color;
    this.borderWidth = borderWidth*2;

    this.tex = new PIXI.RenderTexture(this.w+this.borderWidth*2,this.h+this.borderWidth*2);
    this.sprite = new PIXI.Sprite(this.tex);
    this.sprite.scale.x = 0.5;
    this.sprite.scale.y = 0.5;
    this.lastHighlight = new Date().getTime()-HUD.flashFadeTime;
    this.redraw = true;

    this.draw = function(graphics) {
        if (this.redraw) {
            var highlightProgress = new Date().getTime() - this.lastHighlight;
            highlightProgress = Math.min(highlightProgress/HUD.circleHighlightTime, 1);

            graphics.clear();
            graphics.lineStyle(this.borderWidth, this.color, 1);
            graphics.drawEllipse(this.w/2+this.borderWidth, this.h/2+this.borderWidth, this.w/2*highlightProgress, this.h/2*highlightProgress);

            this.tex.render(graphics);
            console.log(this.tex);

            if (highlightProgress == 1) {
                this.redraw = false;
            }
        }
    };

    this.highlight = function() {
        this.lastHighlight = new Date().getTime();
        this.redraw = true;
    };

    this.setActive = function() {
        this.sprite.alpha = 1;
    };

    this.setInactive = function() {
        this.sprite.alpha = 0;
    };

    this.set = function(props) {
        for (var prop in props) {
            this[prop] = props[prop];
        }
    };
};