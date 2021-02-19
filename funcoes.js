$(function(){

    var indice_selecionado = -1;

    var arrLocaisTrabalho = sessionStorage.getItem("arrLocaisTrabalho");

    arrLocaisTrabalho = JSON.parse(arrLocaisTrabalho);

    if(arrLocaisTrabalho== null)
        arrLocaisTrabalho = [];

    function Adicionar(){

        if ($("#txtFuncionario").val() != "" && $("#txtLocalDeTrabalho").val() != "") {

        var cli = GetFuncionario("Funcionario", $("#txtFuncionario").val());

        if(cli != null){
            alert("Funcion\u00e1rio j\u00e1 cadastrado.");
            return;
        }

        var funcionario = JSON.stringify({
            Funcionario   : $("#txtFuncionario").val(),
            Predio     : $("#txtPredio").val(),
            LocalDeTrabalho: $("#txtLocalDeTrabalho").val(),
        });

        arrLocaisTrabalho.push(funcionario);

        sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify(arrLocaisTrabalho));

        alert("Funcion\u00e1rio adicionado.");
            return true;

        } else {
            alert("Todos os campos s\u00e3o obrigat\u00f3rios!");
            return true;  
        }
    }

    function Editar(){

        arrLocaisTrabalho[indice_selecionado] = JSON.stringify({
            Funcionario   : $("#txtFuncionario1").val(),
            Predio     : $("#txtPredio1").val(),
             LocalDeTrabalho : $("#txtLocalDeTrabalho1").val(),
        });

        sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify(arrLocaisTrabalho));

        alert("Funcion\u00e1rio editado.")
        Listar();
        return true;

    }

    function Listar(){
        $("#tblListar").html("");
        $("#tblListar").html(
        "<thead>"+
        " <tr class=\"bg-primary\" style=\"color: aliceblue;\">"+
        " <th>Funion&aacuterio</th>"+
        " <th>Pr&eacutedio</th>"+
        " <th>Local de Trabalho</th>"+
        "<th></th>"+
        " </tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );

        for(var i in arrLocaisTrabalho){
            var cli = JSON.parse(arrLocaisTrabalho[i]);
             $("#tblListar tbody").append("<tr>"+
                " <td>"+cli.Funcionario+"</td>" +
                " <td>"+cli.Predio+"</td>" +
                " <td>"+cli.LocalDeTrabalho+"</td>" +
                " <td class=\"td_fig\" > <img src='edit.png' alt='"+i+"' class='btnEditar'/><img src='delete.png' alt='"+i+"' class='btnExcluir'/></td>" +
                "</tr>");
        }
    }

    function Excluir(){
        arrLocaisTrabalho.splice(indice_selecionado, 1);
        sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify(arrLocaisTrabalho));
        alert("Registro exclu&iacutedo.");
    }


    function GetFuncionario(propriedade, valor){
        var cli = null;
        for (var item in arrLocaisTrabalho) {
            var i = JSON.parse(arrLocaisTrabalho[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
    }

    Listar();

    $("#frmCadastro").on("submit",function(){
        return Adicionar();
    });

    $("#tblListar").on("click", ".btnEditar", function(){

        indice_selecionado = parseInt($(this).attr("alt"));

        var par = $(this).parent().parent(); //tr
        var tdFuncionario = par.children("td:nth-child(1)");
        var tdPredio = par.children("td:nth-child(2)");
        var tdLocalDeTrabalho = par.children("td:nth-child(3)");
        var tdBotoes = par.children("td:nth-child(4)");

        tdFuncionario.html("<input type='text' id='txtFuncionario1' value='"+tdFuncionario.html()+"'/>");

        tdPredio.html("<select type='text' id='txtPredio1' value='"+tdPredio.html()+"'>" +
                    "<option value=\"Predio 1\">Pr&eacutedio 1</option> " +
                    "<option value=\"Predio 2\">Pr&eacutedio 2</option> " +
                    "<option value=\"Predio 3\">Pr&eacutedio 3</option> " +
                    "<option value=\"Predio 4\">Pr&eacutedio 4</option> </select> " );
        tdLocalDeTrabalho.html("<input type='text' id='txtLocalDeTrabalho1' value='"+tdLocalDeTrabalho.html()+"'/>");

        tdBotoes.html("<img src='save.png' class='btnEditar'/><img src='cancel.png' class='btnCancelar'/>");

        $(".btnEditar").bind("click", Editar);
        $(".btnCancelar").bind("click", Listar);
    });

    $("#tblListar").on("click", ".btnExcluir", function(){
        indice_selecionado = parseInt($(this).attr("alt"));
        Excluir();
        Listar();
    });

});

