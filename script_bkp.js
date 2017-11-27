$(function () {
    var tamtab = 15,
        cobra = [],
        speedSnake = 500,
        direcao = newDirecao = "D",
        tdComida,
        tempoLimite,
        time,
        pontuacao = 0;

    $('<table/>', { id: 'tabela' }).appendTo("body");
    $("#tabela").addClass("tabela");
    for (var i = 0; i < tamtab; i++) {
        var tr = $('<tr/>');
        tr.appendTo('#tabela');
        for (var j = 0; j < tamtab; j++)
            $('<td/>').appendTo(tr);
    };

    function novoJogo() {
        //Criando posições da cobra
        var procuratr = $("#tabela").find("tr:eq(0)");
        cobra[0] = procuratr.find("td:eq(3)");
        cobra[1] = procuratr.find("td:eq(2)");
        cobra[2] = procuratr.find("td:eq(1)");
        gerarComida();
        timer(speedSnake);
    }


    //IIF - Immediate Invoked Funciton
    var preencherCobra = (function preenche() {
        $(".tdMeio, .tdCabeca, .tdFim").removeClass("tdMeio tdCabeca tdFim");
        for (var i = 1; i < cobra.length - 1; i++)
            cobra[i].addClass("tdMeio");

        cobra[0].addClass("tdCabeca");
        cobra[cobra.length - 1].addClass("tdFim");
        return preenche;
    })();

    function movimentarCobra() {
        var tdIndex, trIndex;
        direcao = newDirecao;
        for (var i = cobra.length - 1; i > 0; i--) {
            tdIndex = cobra[i - 1].index();
            trIndex = cobra[i - 1].parent().index();
            cobra[i] = $("#tabela").find("tr:eq(" + trIndex + ")").find("td:eq(" + tdIndex + ")");
        };

        //Move a cabeça pra direção
        tdIndex = cobra[0].index();
        trIndex = cobra[0].parent().index();

        $(document).keydown(function (e) {
            if (e.keyCode == 87 && direcao != "S")
                newDirecao = "W";
            else if (e.keyCode == 68 && direcao != "A")
                newDirecao = "D";
            else if (e.keyCode == 83 && direcao != "W")
                newDirecao = "S";
            else if (e.keyCode == 65 && direcao != "D")
                newDirecao = "A";
        });

        switch (newDirecao) {
            case "W":
                trIndex--;
                break;
            case "D":
                tdIndex++;
                break;
            case "S":
                trIndex++;
                break;
            case "A":
                tdIndex--;
                break;
        }

        //Verificação para atravessar a tela quando chegar no fim
        if (trIndex == tamtab)
            trIndex = 0;
        if (tdIndex == tamtab)
            tdIndex = 0;

        cobra[0] = $("#tabela").find("tr:eq(" + trIndex + ")").find("td:eq(" + tdIndex + ")");
        preencherCobra();

        //Verifica colisão com a comida
        if (tdComida.index() == tdIndex && (tdComida.parent().index() == trIndex)) {
            tdComida.removeClass("tdComida");
            cobra.push(tdComida);
            clearInterval(time);
            gerarComida();
            timer(speedSnake <= 100 ? 100 : speedSnake -= 25);
            pontuacao += 5;
            $("#lblPontuacao").text("Pontuação: " + pontuacao);
        }

        //verifica se colidiu a cobra
        if ($('.tdCabeca').hasClass('tdMeio') || $('.tdCabeca').hasClass('tdFim')) {

            clearInterval(time);
            alert("Fim de jogo! Sua pontuação foi de: " + pontuacao + " pontos!");
        };
    }

    function gerarComida() {
        var tdSemClass = $('td:not(".tdCabeca, .tdMeio, .tdFim")');
        tdComida = $(tdSemClass[Math.floor((Math.random() * (tdSemClass.length)))]).addClass('tdComida');
    }

    function novoJogo() {
        location.reload();
    }

    function timer(speed) {
        time = setInterval(function () {
            movimentarCobra();
        }, speed);
    };
    $("#btnNovo").click(novoJogo);
}());