from datetime import datetime

import sys
import requests
import re
import random
import json


if __name__ == "__main__":
    user, token = sys.argv[1], sys.argv[2]
    pr_number = sys.argv[3]

    contributors = []

    pr_commits = requests.get(
        "https://api.github.com/repos/fga-eps-mds/2021.1-PC-GO1-Archives/pulls/" + 
        pr_number + "/commits", auth=requests.auth.HTTPBasicAuth(user, token)
    )

    try:
        for pr_commit in pr_commits.json():
            contributor = pr_commit["author"]["login"]
            contributors.append(contributor) if contributor not in contributors else None
    except:
        raise Exception("Unable to collect PR contributors.")

    pr_body = open("pr_body.txt", "r")

    pr_body_text = ""

    for line in pr_body.readlines(): pr_body_text = pr_body_text + line
    
    pr_body.close()

    pr_issues_numbers = [
        pr_issue_number.replace("[#", "").replace("]", "")
        for pr_issue_number in re.findall(r"\[#\d+\]", pr_body_text)
    ]

    topics = []    

    try:
        for pr_issue_number in pr_issues_numbers:
            issue_data = requests.get(
                "https://api.github.com/repos/fga-eps-mds/2021.1-PC-GO1/issues/" +
                pr_issue_number, auth=requests.auth.HTTPBasicAuth(user, token)
            )

            topics.append((pr_issue_number, issue_data.json()["title"]))
    except:
        print('\033[93m' + "WARNING:" + '\033[0m' + " Unable to collect topics.")

    last_tag = requests.get(
        "https://api.github.com/repos/J-Matheus/FT/tags", #
        auth=requests.auth.HTTPBasicAuth(user, token)
    ).json()[0]['name'][1:]

    release_type = sys.argv[4]

    tag_components = last_tag.split(".")

    changelog = open("CHANGELOG.md", "w")

    new_tag = ""

    if release_type == "PATCH":
        new_tag = "v" + tag_components[0] + "." + tag_components[1] + "." \
            + str(int(tag_components[2]) + 1)

        changelog.writelines(
            "Hoje, estamos lançando, com as correções dos erros encontrados recentemente "
            "pela comunidade, uma nova versão da API de Gerenciamento de Usuários do "
            "sistema *[SysArq](https://github.com/fga-eps-mds/2021.1-PC-GO1)*. Ainda não "
            "conhece o sistema? "
            "**[Saiba Mais](https://fga-eps-mds.github.io/2021.1-PC-GO1/)**\n"
        )

        icon_c = [
            ":adhesive_bandage:", ":bug:", ":fire_extinguisher:", ":pill:", ":radioactive:"
        ]

        if topics != []:
            changelog.writelines("\n## " + random.choice(icon_c) + " Correções de Erros\n")

    elif release_type == "MINOR" or release_type == "MAJOR":
        if release_type == "MINOR":
            new_tag = "v" + tag_components[0] + "." + str(int(tag_components[1]) + 1) + ".0"

            changelog.writelines(
                "Hoje, estamos lançando, com as alterações recentes, uma nova versão da API"
                " de Gerenciamento de Usuários do sistema "
                "*[SysArq](https://github.com/fga-eps-mds/2021.1-PC-GO1)*.\nAinda não "
                "conhece o sistema? "
                "**[Saiba Mais](https://fga-eps-mds.github.io/2021.1-PC-GO1/)**\n"
            )

        if release_type == "MAJOR":
            new_tag = "v" + str(int(tag_components[0]) + 1) + ".0.0"

            changelog.writelines(
                "Hoje, estamos lançando, para marcar o fim de um prazo, uma nova versão da"
                " API de Gerenciamento de Usuários do sistema "
                "*[SysArq](https://github.com/fga-eps-mds/2021.1-PC-GO1)*. Ainda não "
                "conhece o sistema? "
                "**[Saiba Mais](https://fga-eps-mds.github.io/2021.1-PC-GO1/)**\n"
            )

        icon_c = [":brain:", ":bulb:", ":dart:", ":pushpin:", ":rocket:"]

        if topics != []:
            changelog.writelines("\n## " + random.choice(icon_c) + " Alterações\n")

    else:   
        raise Exception("Invalid Release Type.")

    if len(topics) != 0:
        for topic in topics:
            changelog.writelines(
                "\n- " + topic[1] + " ([#" + topic[0] +
                "](https://github.com/fga-eps-mds/2021.1-PC-GO1/issues/" +
                topic[0] + "))\n"
            )

    icon_cc = [":medal_sports:", ":trophy:", ":1st_place_medal:"]

    changelog.writelines("\n## " + random.choice(icon_cc) + " Contribuidores\n")

    for contributor in contributors: changelog.writelines("\n- @" + contributor + "\n")

    changelog.close()

    analytics = requests.get(
        "https://sonarcloud.io/api/measures/component_tree?"
        "component=fga-eps-mds_2021.1-PC-GO1-Archives&"
        "metricKeys=files,functions,complexity,comment_lines_density,"
        "duplicated_lines_density,coverage,ncloc,security_rating,tests,"
        "test_success_density,test_execution_time,reliability_rating&ps=500"
    ).json()

    now = datetime.now()

    data_release = (
        f"{now.day:02d}-{now.month:02d}-" + str(now.year) + f"-{now.hour:02d}"
    )

    analytics_path = "fga-eps-mds-2021_1-PC-GO1-Archives-" + new_tag.replace(".", "_") + "-" + data_release + ".json"

    with open(analytics_path, "w") as file:
        json.dump(analytics, file)
    
    command = (
        "gh release create " + new_tag + " '" + analytics_path + "#Métricas SonarCloud (json)' -F CHANGELOG.md -t " + new_tag
    )

    create_release_sh = open("create_release.sh", "w")
    create_release_sh.writelines(command)
    create_release_sh.close()

    command = (
        "cp " + analytics_path + " target\n" +
        "cd target\n" +
        "git add " + analytics_path + "\n"
        "git commit -m \"Adiciona Métricas da Release " + new_tag + " do Archives\"\n"
    )

    doc_update_sh = open("doc_update.sh", "w")
    doc_update_sh.writelines(command)
    doc_update_sh.close()
