package tech.helen.bookshop.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class JWTParser {

    public static String extractEmail(String token) {
        String email = jwtExtraction(token, "\"sub\"");
        if (email != null)
            return email;
        return "";
    }

    public static String jwtExtraction(String token, String tag) {

        token.replace("Bearer ", "");

        String[] args = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String data = new String(decoder.decode(args[1]));

        String[] values = data.split(",");
        Map<String, String> dict = new HashMap<String, String>();

        for (String value : values) {
            String[] key = value.split(":");
            if (key[0].equals(tag)) {

                int remove = 1;
                if (key[1].endsWith("}")) {
                    remove = 2;
                }
                key[1] = key[1].substring(0, key[1].length() - remove);
                key[1] = key[1].substring(1);

                dict.put(key[0], key[1]);
            }
        }
        if (dict.containsKey(tag)) {
            return dict.get(tag);
        }
        return null;
    }
}