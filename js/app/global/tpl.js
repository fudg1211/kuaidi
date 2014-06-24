/**
 * Created by fudongguang on 14-3-8.
 */
define(function () {
	return {
		tplnuList:function(md){
			var ___ViewO = [];
			___ViewO.push("<li id=\"nu_");
			___ViewO.push(((md['nu'])));
			___ViewO.push("_");
			___ViewO.push(((md['com'])));
			___ViewO.push("\" nu=\"");
			___ViewO.push(((md['nu'])));
			___ViewO.push("\" class=\"orderInfo\" >\n");
			___ViewO.push("    <div>\n");
			___ViewO.push("        <span class=\"orderNu\">[");
			___ViewO.push(((md['comDetail'][2])));
			___ViewO.push("] 单号：<span style=\"color: red;\">");
			___ViewO.push(((md['nu'])));
			___ViewO.push("</span>\n");
			___ViewO.push("            ");
			if (!parseInt(md['ischeck'])) {
				___ViewO.push("\n");
				___ViewO.push("            ");
			}
			___ViewO.push("\n");
			___ViewO.push("        </span>\n");
			___ViewO.push("    </div>\n");
			___ViewO.push("\n");
			___ViewO.push("    <div style=\"line-height: 22px;margin-top: 5px;\">\n");
			___ViewO.push("        <div class=\"orderNewestState box\">\n");
			___ViewO.push("            <div class=\"orange\">最新状态：</div>\n");
			___ViewO.push("            <div class=\"boxFlex\">");
			___ViewO.push(((md['data'][0]['context'])));
			___ViewO.push("</div>\n");
			___ViewO.push("        </div>\n");
			___ViewO.push("        <div class=\"boxFlex orderDescDetailContainer\">\n");
			___ViewO.push("            ");
			for (var i = 0; i < md['data'].length; i++) {
				___ViewO.push("\n");
				___ViewO.push("            <div class=\"box orderDetail\">\n");
				___ViewO.push("                <div class=\"orderDescTime\">");
				___ViewO.push(((md['data'][i]['time'])));
				___ViewO.push("</div>\n");
				___ViewO.push("                <div class=\"boxFlex\">");
				___ViewO.push(((md['data'][i]['context'])));
				___ViewO.push("</div>\n");
				___ViewO.push("            </div>\n");
				___ViewO.push("            ");
			}
			___ViewO.push("\n");
			___ViewO.push("            <div class=\"jiantou\"></div>\n");
			___ViewO.push("        </div>\n");
			___ViewO.push("    </div>\n");
			___ViewO.push("\n");
			___ViewO.push("    ");
			if (!parseInt(md['ischeck'])) {
				___ViewO.push("\n");
				___ViewO.push("        <div class=\"lastRefreshTime\">上次更新时间：");
				___ViewO.push(((md['timeStr'])));
				___ViewO.push("</div>\n");
				___ViewO.push("    ");
			}
			___ViewO.push("\n");
			___ViewO.push("\n");
			___ViewO.push("    <img src=\"images/del.png\" class=\"delNu\"/>\n");
			___ViewO.push("    ");
			if (!parseInt(md['ischeck'])) {
				___ViewO.push("\n");
				___ViewO.push("    <img src=\"images/refresh.png\" class=\"refreshNu\"/>\n");
				___ViewO.push("    ");
			} else {
				___ViewO.push("\n");
				___ViewO.push("    <img src=\"images/end.png\" class=\"endIco\"/>\n");
				___ViewO.push("    ");
			}
			___ViewO.push("\n");
			___ViewO.push("</li>");
			return ___ViewO.join('');
		},

		tpladdNu:function(md){
			var ___ViewO = [];; ___ViewO.push("<div>\n");
			___ViewO.push("    <div class=\"header\">\n");
			___ViewO.push("        <div class=\"appTitle center\">新建运单</div>\n");
			___ViewO.push("        <img src=\"images/set.png\" class=\"setIco\" id=\"setIco\"/>\n");
			___ViewO.push("    </div>\n");
			___ViewO.push("    <div class=\"inputTag\">\n");
			___ViewO.push("        <div></div>\n");
			___ViewO.push("        <div class=\"spacing\">\n");
			___ViewO.push("        <input type=\"text\" maxlength=\"33\" id=\"addInput\" value=\""); ___ViewO.push((EJS.Scanner.to_text(md['last'][0]))); ___ViewO.push("\" placeholder=\"运单号：3763434222\" class=\"inputText addInput\"/>\n");
			___ViewO.push("        </div>\n");
			___ViewO.push("        <div class=\"companyContainer spacing\">\n");
			___ViewO.push("\n");
			___ViewO.push("\n");
			___ViewO.push("            "); if(!md['data'].length){; ___ViewO.push("\n");
//				___ViewO.push("                <script type=\"text/javascript\">\n");
//				___ViewO.push("                    $('#setIco').addClass('setIco_tip');\n");
//				___ViewO.push("                </script>\n");
				___ViewO.push("                <div class=\"noSelectCompanys\">请先点击右上角设置按钮设置常用快递公司</div>\n");
				___ViewO.push("            "); }; ___ViewO.push("\n");
			___ViewO.push("\n");
			___ViewO.push("            <ul>\n");
			___ViewO.push("                "); for(var i=0;i<md['data'].length;i++){; ___ViewO.push("\n");
				___ViewO.push("                <li companyId=\""); ___ViewO.push((EJS.Scanner.to_text(md['data'][i][0]))); ___ViewO.push("\" class=\"company "); ___ViewO.push((EJS.Scanner.to_text(md['data'][i][5]))); ___ViewO.push("\" "); if (md['data'][i][5]){; ___ViewO.push(" id=\"companySelected\" "); }; ___ViewO.push(">"); ___ViewO.push((EJS.Scanner.to_text(md['data'][i][2]))); ___ViewO.push("</li>\n");
				___ViewO.push("                "); }; ___ViewO.push("\n");
			___ViewO.push("            </ul>\n");
			___ViewO.push("        </div>\n");
			___ViewO.push("        <div class=\"spacing\">\n");
			___ViewO.push("            <button class=\"m-button orangeButton\" id=\"search\">查 询</button>\n");
			___ViewO.push("        </div>\n");
			___ViewO.push("    </div>\n");
			___ViewO.push("\n");
			___ViewO.push("    <div style=\"height: 5px;\"></div>\n");
			___ViewO.push("\n");
			___ViewO.push("    <a href=\"#\" class=\"dialogClose J-dialogClose\"></a>\n");
			___ViewO.push("</div>");

			return ___ViewO.join('');
		},

		tplsetNu:function(md){
			var ___ViewO = [];; ___ViewO.push("<div>\n");
			___ViewO.push("    <div class=\"header\">\n");
			___ViewO.push("        <div class=\"appTitle center\">设置常用快递公司</div>\n");
			___ViewO.push("    </div>\n");
			___ViewO.push("    <div class=\"inputTag\">\n");
			___ViewO.push("        <div></div>\n");
			___ViewO.push("        <div class=\"companyContainer spacing\">\n");
			___ViewO.push("            <ul>\n");
			___ViewO.push("                "); for(var i=0;i<md['data'].length;i++){; ___ViewO.push("\n");
				___ViewO.push("                <li id=\""); ___ViewO.push((EJS.Scanner.to_text(md['data'][i][0]))); ___ViewO.push("\" class=\"selecteCompanys "); if(md['data'][i][4]){; ___ViewO.push("companysSelected"); }; ___ViewO.push(" \">"); ___ViewO.push((EJS.Scanner.to_text(md['data'][i][2]))); ___ViewO.push("</li>\n");
				___ViewO.push("                "); }; ___ViewO.push("\n");
			___ViewO.push("            </ul>\n");
			___ViewO.push("        </div>\n");
			___ViewO.push("        <div class=\"spacing\">\n");
			___ViewO.push("            <button class=\"m-button orangeButton\" id=\"saveSetCompanys\">保 存</button>\n");
			___ViewO.push("        </div>\n");
			___ViewO.push("        <div class=\"spacing\" style=\"margin-top: 5px;\"></div>\n");
			___ViewO.push("    </div>\n");
			___ViewO.push("    <a href=\"#\" class=\"dialogClose J-dialogClose\"></a>\n");
			___ViewO.push("</div>");
			return ___ViewO.join('');
		},
		tpldialog:function(md){
			var ___ViewO = [];; ___ViewO.push("<div>\n");
			___ViewO.push("    <a href=\"#\" class=\"dialogClose J-dialogClose\"></a>\n");
			___ViewO.push("    <div style=\"text-align: center;color: #fff;\">\n");
			___ViewO.push("        "); ___ViewO.push((EJS.Scanner.to_text( md['msg']))); ___ViewO.push("\n");
			___ViewO.push("    </div>\n");
			___ViewO.push("    ");  if(md['buttons']){ ; ___ViewO.push("\n");
				___ViewO.push("    <div class=\"tagC\" style=\"text-align:center;margin: 20px 0;\">\n");
				___ViewO.push("        "); for(var i=0;i<md['buttons'].length;i++){; ___ViewO.push("\n");
					___ViewO.push("        <button class=\"box aTagButton orangeButton J-dialogButton "); ___ViewO.push((EJS.Scanner.to_text( md['buttons'][i][1]))); ___ViewO.push("\">\n");
					___ViewO.push("            "); ___ViewO.push((EJS.Scanner.to_text( md['buttons'][i][0]))); ___ViewO.push("\n");
					___ViewO.push("        </button>\n");
					___ViewO.push("        "); }; ___ViewO.push("\n");
				___ViewO.push("    </div>\n");
				___ViewO.push("    ");  }; ___ViewO.push("\n");
			___ViewO.push("</div>");
			return ___ViewO.join('');
		},

		tplalert:function(md){
			var ___ViewO = [];; ___ViewO.push("<div>\n");
			___ViewO.push("    <a href=\"#\" class=\"dialogClose J-dialogClose\"></a>\n");
			___ViewO.push("    <div>\n");
			___ViewO.push("        <img src=\"images/tip.png?vv=123\" class=\"middle tipImg\">\n");
			___ViewO.push("        "); ___ViewO.push((EJS.Scanner.to_text( md['msg']))); ___ViewO.push("\n");
			___ViewO.push("    </div>\n");
			___ViewO.push("    ");  if(md['buttons']){ ; ___ViewO.push("\n");
				___ViewO.push("    <div class=\"tagC\" style=\"text-align:center;margin: 20px 0;\">\n");
				___ViewO.push("        "); for(var i=0;i<md['buttons'].length;i++){; ___ViewO.push("\n");
					___ViewO.push("        <button class=\"box aTagButton orangeButton J-dialogButton "); ___ViewO.push((EJS.Scanner.to_text( md['buttons'][i][1]))); ___ViewO.push("\">\n");
					___ViewO.push("            "); ___ViewO.push((EJS.Scanner.to_text( md['buttons'][i][0]))); ___ViewO.push("\n");
					___ViewO.push("        </button>\n");
					___ViewO.push("        "); }; ___ViewO.push("\n");
				___ViewO.push("    </div>\n");
				___ViewO.push("    ");  }; ___ViewO.push("\n");
			___ViewO.push("</div>");

			return ___ViewO.join('');
		}
	}
});