let chart_canvas = document.getElementById("canvas-chart");
chart_canvas.width = 300;
chart_canvas.height = 300;

function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
}

let assignments = {
    "Lenguajes de programacion": 10,
    "Tecnologias web": 6,
    "Principios de electronica": 9,
    "Metodos numericos": 7
};

let Barchart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    this.draw = function(){
        let maxValue = 0;
        for (let categ in this.options.data){
            maxValue = Math.max(maxValue,this.options.data[categ]);
        }
        let canvasActualHeight = this.canvas.height - this.options.padding * 2;
        let canvasActualWidth = this.canvas.width - this.options.padding * 2;

        //drawing the grid lines
        let gridValue = 0;
        while (gridValue <= maxValue){
            let gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );

            //writing grid markers
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.textBaseline="bottom";
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();

            gridValue+=this.options.gridScale;
        }

        //drawing the bars
        let barIndex = 0;
        let numberOfBars = Object.keys(this.options.data).length;
        let barSize = (canvasActualWidth)/numberOfBars;

        for (let dataKey in this.options.data){
            let val = this.options.data[dataKey];
            let barHeight = Math.round( canvasActualHeight * val/maxValue) ;
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex%this.colors.length]
            );

            barIndex++;
        }

        //drawing series name
        this.ctx.save();
        this.ctx.textBaseline="bottom";
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "bold 14px Arial";
        this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
        this.ctx.restore();

        //draw legend
        barIndex = 0;
        let legend = document.querySelector("span[id='canvas-span']");
        let ul = document.createElement("ul");
        legend.append(ul);
        for (let category in this.options.data){
            let li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.borderLeft = "20px solid "+this.colors[barIndex%this.colors.length];
            li.style.padding = "5px";
            li.textContent = category;
            ul.append(li);
            barIndex++;
        }
    }
}


let barchart = new Barchart(
    {
        canvas:chart_canvas,
        seriesName:"Promedio de notas",
        padding:20,
        gridScale:5,
        gridColor:"#eeeeee",
        data:assignments,
        colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
);

barchart.draw();